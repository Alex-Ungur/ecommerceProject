// import useLocalStorageUser from "../hooks/useLocalStorageUser";
import Layout from "../layout";
import { useCartStore } from "../stores/useCartStore";

const Cart = () => {
  // const userId = useLocalStorageUser();
  // console.log(userId);
  const cartList = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (cartList.length > 0) {
    console.log(cartList);
    return (
      <>
        <Layout>
          <p>
            {cartList.map((cartItem) => (
              <>
                <p key={cartItem.productId}>{cartItem.name}</p>
                <img src={cartItem.image} className="max-w-[10rem]" />
                <p>Quantité : {cartItem.quantity}</p>
                <p>Prix unitaire : {cartItem.price} $</p>
                <p>Prix Total : {cartItem.price * cartItem.quantity} $</p>
                <button
                  onClick={() =>
                    useCartStore.getState().removeItem(cartItem.productId)
                  }
                >
                  Supprimer
                </button>
              </>
            ))}
          </p>
          <p>Total : {totalPrice} $</p>
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
