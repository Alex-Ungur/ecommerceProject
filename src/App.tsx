// import { useState } from "react";
import Layout from "./layout";
import Products from "./components/Products";
// import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
// import AuthDetails from "./components/AuthDetails";
// import useUserStore from "./stores/useUserStore";
// import useLocalStorageUser from "./hooks/useLocalStorageUser";

export type product = {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  promo: [];
  description: string;
  image: string;
};

const App = () => {
  // const { currentUser } = useAuth();
  // console.log(currentUser);
  // const initializeUser = useUserStore((state) => state.initializeUser);
  // useEffect(() => {
  //   initializeUser();
  // }, [initializeUser]);

  return (
    <>
      <Layout>
        {/* <AuthDetails /> */}
        <Products />
      </Layout>
    </>
  );
};

export default App;
