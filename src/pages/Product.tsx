// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { getProductFb } from "../api/Products";
import { useQuery } from "@tanstack/react-query";
// import { useCartStore } from "../stores/useCartStore";
import { useCartStore } from "../stores/cart";
import { Rating } from "react-simple-star-rating";
import { IProduct } from "../types/product.types";

const Product = () => {
  const { productId } = useParams();
  const { add: handleAddToCart } = useCartStore();
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
        {productData?.length
          ? (productData as IProduct[])?.map((product: IProduct) => (
              <div key={product.id}>
                <img
                  src={product.image}
                  alt={`${product.title} image`}
                  className="max-w-[15rem]"
                />
                <p>{product.title}</p>
                <p>{product.price} $</p>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <Rating
                  initialValue={product.rating}
                  readonly
                  allowFraction
                  size={25}
                />
                <button onClick={() => handleAddToCart(product)}>
                  Ajouter au panier
                </button>
              </div>
            ))
          : "Aucun produit trouvé"}
      </Layout>
    </>
  );
};

export default Product;
