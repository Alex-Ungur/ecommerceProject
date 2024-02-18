// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { getProductFb } from "../api/Products";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../types/product.types";
import ProductItem from "../components/ProductItem";

const Product = () => {
  const { productId } = useParams();
  // const { add: handleAddToCart } = useCartStore();
  const {
    isLoading,
    error,
    isFetching,
    isRefetching,
    data: productData,
  } = useQuery({
    queryKey: ["productData"],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: async () => await getProductFb(productId),
  });

  if (isLoading || isFetching || isRefetching) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <p>Une erreur s'est produite</p>
      </Layout>
    );
  }

  console.log(productData);

  return (
    <>
      <Layout>
        <ul className="my-[8rem]">
          {productData?.length ? (
            (productData as IProduct[])?.map((product: IProduct) => (
              <ProductItem
                key={product.id}
                productItem={product}
                list={false}
              />
            ))
          ) : (
            <li>"Aucun produit trouvé"</li>
          )}
        </ul>
      </Layout>
    </>
  );
};

export default Product;
