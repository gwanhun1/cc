import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Loading from "./components/common/Loading";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { useMonthlyImages } from "./hooks/useImagesGet";
import Layout from "./layout/layout";
import { currentDateState } from "./recoil/atoms";
import { Router } from "./Router";
import { formatYearMonth } from "./utils/formatYearMonth";

const App = () => {
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
      <Layout>
        <Router />
      </Layout>
      <Footer />
    </>
  );
};

export default App;
