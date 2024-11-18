import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import Loading from "./components/common/Loading";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { useUserThemeFetch } from "./hooks/useUserThemeFetch";
import Layout from "./layout/Layout";
import { Router } from "./Router";
import { getDynamicTheme } from "./theme";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useMemo(() => localStorage.getItem("authToken"), []);
  const { color, status } = useUserThemeFetch();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        await new Promise((resolve) => setTimeout(resolve, 2300));
      }
      setIsLoading(false);
    };
    checkToken();
  }, [token]);

  const dynamicTheme = useMemo(() => getDynamicTheme(color), [color]);

  if (isLoading || status === "loading") {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={dynamicTheme}>
      <Nav />
      <Layout>
        <Router />
      </Layout>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
