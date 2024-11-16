import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

// 테마 설정
const themes = {
  DEFAULT: "default",
  GREEN: "green",
  BLUE: "blue",
  BLACK: "black",
  GRAY: "gray",
};

const colorMap = {
  default: {
    primary: "#cf364d", // 기본 색상
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#070405", // 오늘 날짜 배경색
    dayHeaderBg: "#d0354e1a", // 날짜 셀 배경색
  },
  green: {
    primary: "#28a745",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#e5f9e5", // 오늘 날짜 배경색
    dayHeaderBg: "#28a74533", // 날짜 셀 배경색
  },
  blue: {
    primary: "#007bff",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#d1e9ff", // 오늘 날짜 배경색
    dayHeaderBg: "#007bff33", // 날짜 셀 배경색
  },
  black: {
    primary: "#000000",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#333333", // 오늘 날짜 배경색
    dayHeaderBg: "#00000033", // 날짜 셀 배경색
  },
  gray: {
    primary: "#6c757d",
    eventBg: "transparent",
    eventBorder: "none",
    eventText: "inherit",
    eventShadow: "none",
    todayBg: "#f1f1f1", // 오늘 날짜 배경색
    dayHeaderBg: "#6c757d33", // 날짜 셀 배경색
  },
};

type UseUserThemeFetchResult = {
  color: string; // 색상만 리턴하도록 수정
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

export function useUserThemeFetch(): UseUserThemeFetchResult {
  const [color, setColor] = useState<string>(colorMap.default.primary); // 기본값으로 cf364d 설정
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
          const theme = userData?.theme || themes.DEFAULT; // 없으면 기본값

          // 해당 테마가 colorMap에 존재하는지 확인하고 기본값을 설정
          const selectedTheme =
            colorMap[theme.toLowerCase()] || colorMap.default;
          setColor(selectedTheme.primary); // 색상 업데이트

          // :root의 --color 값을 동적으로 변경
          document.body.classList.add(`theme-${theme.toLowerCase()}`); // body에 테마 클래스 추가
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
  }, [auth.currentUser?.uid, db]); // auth.currentUser?.uid만 의존성으로 추가

  return { color, status, error };
}
