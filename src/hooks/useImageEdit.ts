import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
      const targetWidth = 260;
      const targetHeight = 152;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const aspectRatio = img.width / img.height;
      const targetAspectRatio = targetWidth / targetHeight;

      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (aspectRatio > targetAspectRatio) {
        drawHeight = targetWidth / aspectRatio;
        offsetY = (targetHeight - drawHeight) / 2;
      } else {
        drawWidth = targetHeight * aspectRatio;
        offsetX = (targetWidth - drawWidth) / 2;
      }

      ctx?.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert image to WebP"));
          }
        },
        "image/webp",
        1.0
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
        const processedFile = await processImage(file);

        const imageRef = ref(
          storage,
          `${auth.currentUser.uid}/${monthKey}/${file.name.replace(
            /\.[^/.]+$/,
            ".webp"
          )}`
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
        id
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
