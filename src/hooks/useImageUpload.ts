import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

type ImageData = {
  file: File;
  title: string;
  date: string; // "YYYY-MM-DD" format
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

type UseImageUploadResult = {
  uploadImage: (imageData: ImageData) => Promise<void>;
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
      const targetRatio = 56.92 / 50; // Target aspect ratio

      // Original image dimensions
      const { width: originalWidth, height: originalHeight } = img;

      let cropWidth, cropHeight;
      let offsetX = 0,
        offsetY = 0;

      // Determine crop dimensions based on aspect ratio
      if (originalWidth / originalHeight > targetRatio) {
        cropWidth = originalHeight * targetRatio;
        cropHeight = originalHeight;
        offsetX = (originalWidth - cropWidth) / 2;
      } else {
        cropWidth = originalWidth;
        cropHeight = originalWidth / targetRatio;
        offsetY = (originalHeight - cropHeight) / 2;
      }

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw the cropped image
      ctx?.drawImage(
        img,
        offsetX,
        offsetY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Convert canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert image to Blob"));
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

export function useImageUpload(): UseImageUploadResult {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  const uploadImage = async (imageData: ImageData) => {
    setStatus("uploading");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    const { file, title, date } = imageData;

    try {
      const processedFile = await processImage(file);

      const [year, month] = date.split("-").slice(0, 2);
      const monthKey = `${year}-${month}`;

      const imageRef = ref(
        storage,
        `${auth.currentUser.uid}/${monthKey}/${file.name.replace(
          /\.[^/.]+$/,
          ".webp"
        )}`
      );
      const snapshot = await uploadBytes(imageRef, processedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const userRef = doc(db, "users", auth.currentUser.uid);
      const monthRef = doc(collection(userRef, "months"), monthKey);
      const imagesCollectionRef = collection(monthRef, "images");

      await addDoc(imagesCollectionRef, {
        imageUrl: downloadURL,
        title: title,
        date: date,
        timestamp: serverTimestamp(),
      });

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

  return { uploadImage, status, error };
}
