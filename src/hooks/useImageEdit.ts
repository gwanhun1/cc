import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

type ImageData = {
  id: string;
  file?: File;
  title: string;
  date: string;
  url?: string;
};

type UploadStatus = "idle" | "updating" | "success" | "error";

type UseImageEditResult = {
  editImage: (imageData: ImageData) => Promise<void>;
  status: UploadStatus;
  error: string | null;
};

// 압축
async function processImage(file: File): Promise<Blob> {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const targetRatio = 56.92 / 50; // 목표 비율 56.92:50

      // 이미지의 원래 비율
      const originalRatio = img.width / img.height;

      let targetWidth, targetHeight;

      if (originalRatio > targetRatio) {
        // 이미지가 너무 넓은 경우
        targetHeight = 260; // 원하는 높이
        targetWidth = targetHeight * targetRatio;
      } else {
        // 이미지가 너무 높은 경우 또는 비율이 동일한 경우
        targetWidth = 260; // 원하는 폭
        targetHeight = targetWidth / targetRatio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert image to WebP"));
          }
        },
        "image/webp",
        1.0,
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function useImageEdit(): UseImageEditResult {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  const editImage = async (imageData: ImageData) => {
    setStatus("updating");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    const { id, file, title, date, url } = imageData;

    try {
      let downloadURL = url;

      const dateObj = new Date(date);
      const year = dateObj.getFullYear().toString();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const monthKey = `${year}-${month}`;

      if (file) {
        const processedFile = await file;

        const imageRef = ref(
          storage,
          `${auth.currentUser.uid}/${monthKey}/${file.name.replace(
            /\.[^/.]+$/,
            ".webp",
          )}`,
        );
        const snapshot = await uploadBytes(imageRef, processedFile);
        downloadURL = await getDownloadURL(snapshot.ref);
      }

      if (!auth.currentUser.uid || !monthKey || !id) {
        throw new Error("Invalid document path segments");
      }

      const imageDocRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "months",
        monthKey,
        "images",
        id,
      );

      const updateData: any = {
        title: title,
        date: date,
        timestamp: serverTimestamp(),
      };

      if (downloadURL) {
        updateData.imageUrl = downloadURL;
      }

      await updateDoc(imageDocRef, updateData);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Full error object:", err);
    }
  };

  return { editImage, status, error };
}
