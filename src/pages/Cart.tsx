// import useLocalStorageUser from "../hooks/useLocalStorageUser";
import Layout from "../layout";
import { useCartStore } from "../stores/cart";
import { IProduct } from "../types/product.types";
// import { useCartStore } from "../stores/useCartStore";

const Cart = () => {
  // const userId = useLocalStorageUser();
  // console.log(userId);
  // const cartList = useCartStore((state) => state.cart);
  // const totalPrice = useCartStore((state) => state.totalPrice());
  const { cart, remove, removeAll } = useCartStore();

  // console.log(cartList);
  console.log(cart);

  // if (cartList.length > 0) {
  if (cart.length > 0) {
    return (
      <>
        <Layout>
          <button onClick={() => removeAll()}>Vider panier</button>
          <p>
            {(cart as IProduct[]).map((cartItem: IProduct) => (
              <>
                <p key={cartItem.id}>{cartItem.title}</p>
                <img src={cartItem.image} className="max-w-[10rem]" />
                <p>Quantité : {cartItem.count}</p>
                <p>Prix unitaire : {cartItem.price} $</p>
                <p>Prix Total : {cartItem.price * cartItem.count} $</p>
                <button
                  // onClick={() =>
                  //   useCartStore.getState().removeItem(cartItem.productId)
                  // }
                  onClick={() => remove(cartItem.id)}
                >
                  Supprimer
                </button>
              </>
            ))}
          </p>
          {/* <p>Total : {totalPrice} $</p> */}
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <p>{"Le panier est vide"}</p>
      </Layout>
    </>
  );
};

export default Cart;
