import { useEffect } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorState, fetchStatusState, imagesState } from "../recoil/atoms";

export type Image = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  timestamp: any;
};

export type FetchStatus = "idle" | "loading" | "success" | "error";

// Helper function to preload images
function cacheImages(images: Image[]): void {
  images.forEach((image) => {
    const img = new window.Image();
    img.src = image.imageUrl;
  });
}

// Generate month keys for fetching
function generateMonthKeys(currentMonthKey: string): string[] {
  const [year, month] = currentMonthKey.split("-").map(Number);
  const monthKeys: string[] = [];

  for (let i = 0; i < 2; i++) {
    let targetMonth = month - i;
    let targetYear = year;

    if (targetMonth <= 0) {
      targetMonth += 12;
      targetYear -= 1;
    }

    monthKeys.push(`${targetYear}-${String(targetMonth).padStart(2, "0")}`);
  }

  return monthKeys;
}

export function useMonthlyImages(currentMonthKey: string) {
  const [images, setImages] = useRecoilState(imagesState);
  const setStatus = useSetRecoilState(fetchStatusState);
  const setError = useSetRecoilState(errorState);

  const db = getFirestore();
  const auth = getAuth();

  const fetchImages = async () => {
    setStatus("loading");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    try {
      const monthKeys = generateMonthKeys(currentMonthKey);
      const allImages: Image[] = [];

      await Promise.all(
        monthKeys.map(async (monthKey) => {
          const userRef = collection(
            db,
            "users",
            auth.currentUser!.uid,
            "months",
            monthKey,
            "images",
          );
          const q = query(userRef);
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            allImages.push({
              id: doc.id,
              ...(doc.data() as Omit<Image, "id">),
            });
          });
        }),
      );

      // Sort images by timestamp if needed
      const sortedImages = allImages.sort(
        (a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis(),
      );

      cacheImages(sortedImages);
      setImages(sortedImages);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchImages();
      } else {
        setStatus("error");
        setError("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, [auth, currentMonthKey]);

  const refetch = () => fetchImages();

  return { images, refetch, setImages };
}
