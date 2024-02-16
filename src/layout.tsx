import React from "react";
import Header from "./components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
    </>
  );
};

export default Layout;
