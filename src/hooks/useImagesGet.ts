import { useRecoilState, useSetRecoilState } from "recoil";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useEffect } from "react";
import { errorState, fetchStatusState, imagesState } from "../recoil/atoms";

export type Image = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  timestamp: any;
};

export type FetchStatus = "idle" | "loading" | "success" | "error";

function cacheImages(images: Image[]): void {
  images.forEach((image) => {
    const img = new Image();
    img.src = image.imageUrl;
  });
}

// 새로운 유틸리티 함수: 현재 월을 기준으로 이전 1개월을 포함한 2개월의 키를 생성
function useImagesGet(currentMonthKey: string): string[] {
  const [year, month] = currentMonthKey.split("-").map(Number);
  const monthKeys: string[] = [];

  for (let i = 0; i < 2; i++) {
    let targetMonth = month - i;
    let targetYear = year;

    if (targetMonth <= 0) {
      targetMonth += 12;
      targetYear -= 1;
    }

    monthKeys.push(`${targetYear}-${targetMonth.toString().padStart(2, "0")}`);
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
      const monthKeys = useImagesGet(currentMonthKey);
      const allImages: Image[] = [];

      for (const monthKey of monthKeys) {
        const userRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "months",
          monthKey,
          "images"
        );
        const q = query(userRef);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          allImages.push({
            id: doc.id,
            ...(doc.data() as Omit<Image, "id">),
          });
        });
      }

      cacheImages(allImages);

      setImages(allImages);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.error("Error fetching images:", err);
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

  const refetch = () => {
    return fetchImages();
  };

  return { images, refetch, setImages };
}
