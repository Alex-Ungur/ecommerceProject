// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { getProductFb } from "../api/Products";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../stores/useCartStore";
import { Rating } from "react-simple-star-rating";

type item = {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  rating: number;
  reduction: number;
  stock: number;
  title: string;
};

const Product = () => {
  const { productId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const handleAddItem = (product: any) => {
    // const newItem = {id : number}
    console.log(product);
    const newItem = {
      productId: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    };
    addItem(newItem);
  };

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
        {productData?.map((product) => (
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
            <button onClick={handleAddItem(product)}>Ajouter au panier</button>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Product;
