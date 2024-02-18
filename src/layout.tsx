import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
