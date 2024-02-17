import { IProduct } from "../types/product.types";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useCartStore } from "../stores/cart";
import { useState } from "react";
import PlaceHoderImage from "../assets/placeholder.webp";

const ProductItem = ({ productItem }: { productItem: IProduct }) => {
  const { add: handleAddToCart } = useCartStore();

  const [isHovered, setIsHovered] = useState(false);
  // const [img, setImg] = useState(productItem.image);

  const style = {
    transform: isHovered ? `translate(5px, 5px)` : "",
    transition: `transform 0.3s`,
    "min-height": "10rem",
    width: "100%",
  };

  return (
    <li
      className="h-full w-full border border-rose-500 p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      <Link to={`/product/${productItem.id}`} className="flex flex-col gap-2">
        {productItem.image ? (
          <img
            src={productItem.image}
            alt={`${productItem.title} image`}
            className="aspect-[4/2] object-contain"
          />
        ) : (
          <img src={PlaceHoderImage} alt="" />
        )}

        <p>{productItem.title}</p>
        <p>{productItem.price} $</p>
        <p>{productItem.category}</p>
        {productItem.rating != 0 && (
          <Rating
            initialValue={productItem.rating}
            readonly
            allowFraction
            size={25}
          />
        )}
      </Link>
      <button onClick={() => handleAddToCart(productItem)}>
        Ajouter au panier
      </button>
    </li>
  );
};

export default ProductItem;
