import React, { useState, useEffect } from "react";
import { Router } from "./Router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Loading from "./components/common/Loading";
import { formatYearMonth } from "./utils/formatYearMonth";
import { useRecoilState } from "recoil";
import { currentDateState } from "./recoil/atoms";
import { useMonthlyImages } from "./hooks/useImagesGet";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        await new Promise((resolve) => setTimeout(resolve, 2300));
      }
      setIsLoading(false);
    };

    checkToken();
  }, [token]);

  const { images } = useMonthlyImages(formatYearMonth(currentDate));

  if (isLoading) {
    console.log("Still loading...");
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <Router />
      <Footer />
    </>
  );
};

export default App;
