import React, { useEffect, useState } from "react";
import Loading from "./components/common/Loading";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import Layout from "./layout/layout";
import { Router } from "./Router";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
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
