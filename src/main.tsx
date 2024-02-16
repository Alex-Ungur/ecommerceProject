import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import Product from "./pages/Product.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <div>Le produit recherché n'exsite pas</div>, // pas besoin, erreur gérée dans le composant
    // errorElement: <ErrorPage />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
    // errorElement: <div>Le produit recherché n'exsite pas</div>, // pas besoin, erreur gérée dans le composant
    // errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    // errorElement: <div>Le produit recherché n'exsite pas</div>, // pas besoin, erreur gérée dans le composant
    // errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
