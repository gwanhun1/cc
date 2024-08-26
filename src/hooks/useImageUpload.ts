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

// 타입 정의
type ImageData = {
  file: File;
  title: string;
  date: string; // "YYYY-MM-DD" 형식
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

type UseImageUploadResult = {
  uploadImage: (imageData: ImageData) => Promise<void>;
  status: UploadStatus;
  error: string | null;
};

// 커스텀 훅
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
      // 날짜를 YYYY-MM 형식으로 변환
      const [year, month] = date.split("-").slice(0, 2);
      const monthKey = `${year}-${month}`;

      // Storage에 이미지 업로드
      const imageRef = ref(
        storage,
        `${auth.currentUser.uid}/${monthKey}/${file.name}`
      );
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Firestore에 이미지 정보 저장
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
