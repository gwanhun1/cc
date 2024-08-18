import React from "react";
import { Router } from "./Router.jsx";
import Nav from "./components/layout/Nav.js";
import Footer from "./components/layout/Footer.js";
import Loading from "./components/common/Loading.js";

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Router />
      <Footer />
      {/* <Loading /> */}
    </>
  );
};

export default App;
