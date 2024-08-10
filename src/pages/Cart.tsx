// import useLocalStorageUser from "../hooks/useLocalStorageUser";
import Layout from "../layout";
import { useCartStore } from "../stores/cart";
import { IProduct } from "../types/product.types";

import PlaceHolderImage from "../assets/placeholder.webp";
import { Link } from "react-router-dom";
// import { useCartStore } from "../stores/useCartStore";

const Cart = () => {
  // const userId = useLocalStorageUser();
  // console.log(userId);
  // const cartList = useCartStore((state) => state.cart);
  // const totalPrice = useCartStore((state) => state.totalPrice());
  const { cart, remove, removeAll, totalPrice } = useCartStore();

  // console.log(cartList);

  // if (cartList.length > 0) {
  if (cart.length > 0) {
    return (
      <>
        <Layout>
          <div className="w-full flex p-3">
            <button
              onClick={() => removeAll()}
              className="bg-red-600 lg:ml-auto"
            >
              Vider panier
            </button>
          </div>
          <ul className="grid gap-5">
            {(cart as IProduct[]).map((cartItem: IProduct) => (
              <li
                key={cartItem.id}
                className="text-black flex flex-col items-start lg:flex-row lg:items-center gap-3 border p-5 relative"
              >
                {cartItem.reduction != 0 && (
                  <p className="text-white bg-red-500 font-bold absolute top-2 left-2 py-1 px-3 rounded">
                    Promo !
                  </p>
                )}
                <img
                  src={cartItem.image || PlaceHolderImage}
                  className="max-w-[12rem] border rounded max-w-[5rem]"
                />
                <Link to={`/product/${cartItem.id}`}>
                  <p className="lg:w-[20rem]">{cartItem.title}</p>
                </Link>
                <div className="grid gap-2 lg:ml-auto">
                  <p>Quantité : {cartItem.qty}</p>
                  {cartItem.reduction != 0 ? (
                    <>
                      <p className="line-through">{cartItem.price} €</p>
                      <p>
                        {(
                          cartItem.price -
                          cartItem.price * (cartItem.reduction / 100)
                        ).toFixed(1)}{" "}
                        €
                      </p>
                    </>
                  ) : (
                    <p>{cartItem.price} €</p>
                  )}
                  <p>
                    Prix unitaire :{" "}
                    {cartItem.reduction != 0
                      ? (
                          cartItem.price -
                          cartItem.price * (cartItem.reduction / 100)
                        ).toFixed(1)
                      : cartItem.price}{" "}
                    €
                  </p>
                  <p>
                    Prix Total :{" "}
                    {cartItem.reduction !== 0
                      ? (
                          (cartItem.price -
                            cartItem.price * (cartItem.reduction / 100)) *
                          cartItem.qty
                        ).toFixed(1)
                      : (cartItem.price * cartItem.qty).toFixed(1)}{" "}
                    €
                  </p>
                </div>
                <button
                  // onClick={() =>
                  //   useCartStore.getState().removeItem(cartItem.productId)
                  // }
                  className="text-white lg:ml-auto"
                  onClick={() => remove(cartItem.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
            <p className="text-black text-xl text-end pr-3">
              Total : {totalPrice().toFixed(2)} €
            </p>
          </ul>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <p className="text-black">{"Votre panier est vide"}</p>
      </Layout>
    </>
  );
};

export default Cart;
