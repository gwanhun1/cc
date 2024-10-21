import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function useUserData() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const fetchData = async () => {
          try {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              setUserData(userDocSnap.data());
            } else {
              setUserData(null);
            }
          } catch (error) {
            console.error("사용자 데이터 가져오기 오류:", error);
            setUserData(null);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      } else {
        // 사용자가 로그아웃한 경우
        setUserData(null);
        setLoading(false);
      }
    });

    // Clean up 함수
    return () => unsubscribe();
  }, []);

  return { user, userData, loading };
}

export default useUserData;
