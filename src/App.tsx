// import { useState } from "react";
import Layout from "./layout";
import Products from "./components/Products";
import Hero from "./components/Hero";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Layout>
        <Hero />
        <Products />
      </Layout>
    </>
  );
};

export default App;
