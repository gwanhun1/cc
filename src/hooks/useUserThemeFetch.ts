import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const themes = {
  DEFAULT: "default",
  GREEN: "green",
  BLUE: "blue",
  BLACK: "black",
  GRAY: "gray",
};

const colorMap = {
  default: {
    primary: "#cf364d",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#070405",
    dayHeaderBg: "#d0354e1a",
  },
  green: {
    primary: "#28a745",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#e5f9e5",
    dayHeaderBg: "#28a74533",
  },
  blue: {
    primary: "#007bff",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#d1e9ff",
    dayHeaderBg: "#007bff33",
  },
  black: {
    primary: "#000000",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#333333",
    dayHeaderBg: "#00000033",
  },
  gray: {
    primary: "#6c757d",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#f1f1f1",
    dayHeaderBg: "#6c757d33",
  },
};

type UseUserThemeFetchResult = {
  color: string;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

export function useUserThemeFetch(): UseUserThemeFetchResult {
  const [color, setColor] = useState<string>(colorMap.default.primary);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserTheme = async () => {
      setStatus("loading");
      setError(null);

      // 로그인된 사용자가 없을 경우
      if (!auth.currentUser) {
        setStatus("error");
        setError("User not authenticated");
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const theme = userData?.theme || themes.DEFAULT;

          const selectedTheme =
            colorMap[theme.toLowerCase()] || colorMap.default;
          setColor(selectedTheme.primary);

          document.body.classList.add(`theme-${theme.toLowerCase()}`);
          setStatus("success");
        } else {
          setStatus("error");
          setError("No theme found for the user");
          setColor(colorMap.default.primary);
          document.body.classList.add("theme-default");
        }
      } catch (err) {
        setStatus("error");
        setError("An error occurred while fetching the theme");
        setColor(colorMap.default.primary);
        document.body.classList.add("theme-default");
      }
    };

    fetchUserTheme();
  }, [auth.currentUser?.uid, db]);

  return { color, status, error };
}
