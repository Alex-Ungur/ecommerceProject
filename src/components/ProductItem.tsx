import { IProduct } from "../types/product.types";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useCartStore } from "../stores/cart";
import { useState } from "react";
import PlaceHolderImage from "../assets/placeholder.webp";

const ProductItem = ({
  productItem,
  list = true,
}: {
  productItem: IProduct;
  list?: boolean;
}) => {
  const { add: handleAddToCart } = useCartStore();

  const [isHovered, setIsHovered] = useState(false);
  // const [img, setImg] = useState(productItem.image);

  const style = {
    transform: isHovered ? `translate(5px, 5px)` : "",
    transition: `transform 0.3s`,
    minHeight: "10rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const listItemStyle = list ? style : {};

  const productLink = list ? (
    <li
      className="h-full w-full p-4 shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={listItemStyle}
    >
      <Link
        to={`/product/${productItem.id}`}
        className="flex flex-col gap-2 relative"
      >
        {productItem.reduction != 0 && (
          <p className="text-white bg-red-500 font-bold absolute py-1 px-3 rounded">
            {productItem.reduction}% de promo !
          </p>
        )}
        <div className="mt-6">
          {productItem.image ? (
            <img
              src={productItem.image}
              alt={`${productItem.title} image`}
              className="aspect-[3/2] object-contain m-auto max-h-[15rem]"
            />
          ) : (
            <img src={PlaceHolderImage} alt="" />
          )}
        </div>
        <p>{productItem.title}</p>
        {productItem.reduction != 0 ? (
          <>
            <p className="line-through">{productItem.price} €</p>
            <p>
              {(
                productItem.price -
                productItem.price * (productItem.reduction / 100)
              ).toFixed(1)}{" "}
              €
            </p>
          </>
        ) : (
          <p>{productItem.price} €</p>
        )}
        <p>{productItem.category}</p>
      </Link>
      <div className="mt-auto">
        {productItem.rating !== 0 && (
          <div className="mt-2 h-max">
            <Rating
              initialValue={productItem.rating}
              readonly
              allowFraction
              size={25}
            />
          </div>
        )}
        <button onClick={() => handleAddToCart(productItem)} className="mt-2">
          Ajouter au panier
        </button>
      </div>
    </li>
  ) : (
    <li className="h-full w-full border shadow-2xl max-w-[50rem] m-auto p-4 relative">
      {productItem.reduction != 0 && (
        <p className="text-white bg-red-500 font-bold absolute py-1 px-3 rounded">
          {productItem.reduction}% de promo !
        </p>
      )}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="max-w-[40rem] m-auto">
          {productItem.image ? (
            <img
              src={productItem.image}
              alt={`${productItem.title} image`}
              className="aspect-[4/2] object-contain"
            />
          ) : (
            <img src={PlaceHolderImage} alt="" />
          )}
        </div>
        <div className="text-black flex flex-col">
          <p>{productItem.title}</p>
          {productItem.reduction != 0 ? (
            <>
              <p className="line-through">{productItem.price} €</p>
              <p>
                {(
                  productItem.price -
                  productItem.price * (productItem.reduction / 100)
                ).toFixed(1)}{" "}
                €
              </p>
            </>
          ) : (
            <p>{productItem.price} €</p>
          )}
          <p>{productItem.category}</p>
          {productItem.rating !== 0 && (
            <Rating
              initialValue={productItem.rating}
              readonly
              allowFraction
              size={25}
              className="mb-2"
            />
          )}
          <button
            onClick={() => handleAddToCart(productItem)}
            className="text-white mt-auto"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </li>
  );

  return <>{productLink}</>;
};

export default ProductItem;
