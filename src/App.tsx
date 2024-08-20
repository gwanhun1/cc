import React, { useState, useEffect } from "react";
import { Router } from "./Router";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Loading from "./components/common/Loading";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (token) {
      } else {
      }

      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
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
