import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface User {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  auth: any;
}

interface UserData {
  user: User | null;
  userData: any;
  loading: boolean;
}

function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          auth: firebaseUser,
        };
        setUser(user);

        const fetchData = async () => {
          try {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              setUserData(userDocSnap.data() as UserData);
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
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, userData, loading };
}

export default useUserData;
