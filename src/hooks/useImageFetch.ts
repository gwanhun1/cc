import { useState, useEffect } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";

type Image = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  timestamp: any;
};

type FetchStatus = "idle" | "loading" | "success" | "error";

type UseMonthlyImagesResult = {
  images: Image[];
  status: FetchStatus;
  error: string | null;
  refetch: () => Promise<void>;
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

function cacheImages(images: Image[]): void {
  images.forEach((image) => {
    const img = new Image();
    img.src = image.imageUrl;
  });
}

export function useMonthlyImages(monthKey: string): UseMonthlyImagesResult {
  const [images, setImages] = useState<Image[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string | null>(null);

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

      const imagesList: Image[] = [];
      querySnapshot.forEach((doc) => {
        imagesList.push({
          id: doc.id,
          ...(doc.data() as Omit<Image, "id">),
        });
      });

      cacheImages(imagesList);

      setImages(imagesList);
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
  }, [auth, monthKey]);

  const refetch = () => {
    return fetchImages();
  };

  return { images, status, error, refetch, setImages };
}
