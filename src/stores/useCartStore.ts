import { create } from "zustand";
import { auth } from "../firebase/firebase-config";

type ICartProduct = {
    productId: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
};

type IAddCartItem = {
    userCartId : string | null;
    createdAt : number;
    items: ICartProduct[];
    addItem: (item: ICartProduct) => void;
    removeItem: (productId: number) => void;
    totalPrice: () => number;
    totalQuantity: () => number;
};



export const useCartStore = create<IAddCartItem>((set, get) => {
    const storedItems = localStorage.getItem("cartItems");
    const initialItems = storedItems ? JSON.parse(storedItems) : [];
    const userId = auth.currentUser?.uid;
    

    console.log(storedItems);
    console.log("initialItems", initialItems);
    console.log(userId);
    
    return {
        cart : initialItems.items,
      userCartId : userId || null,
      createdAt : Date.now(),
    //   items: initialItems.items,
      addItem: (item: ICartProduct) =>
          set((state) => {
            // console.log(state.items);
            // const {cart} = get();
            // console.log(cart);
              const existingItemIndex = state.items.findIndex(
                  (existingItem) => existingItem.productId === item.productId
              );

              if (existingItemIndex !== -1) {
                  // Si l'article existe déjà, incrémente la quantité
                  const updatedItems = [...state.items];
                  updatedItems[existingItemIndex].quantity += 1;
                  return { items: updatedItems };
              } else {
                  // Sinon, ajoute l'article à la liste
                  return { items: [...state.items, item] };
              }
          }),
      removeItem: (productId: number) =>
          set((state) => ({
              items: state.items.filter((item) => item.productId !== productId),
          })),
      totalPrice: () =>
          get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      totalQuantity: () => {
        const {cart} = get();
        console.log(cart);
        if(cart) {
            return get().items.reduce((quantity, item) => quantity + item.quantity, 0);
        }
        return 0;
    },
      
    };
});

export const updateUserIdInCart = (userId: string | null) => {
  useCartStore.setState({ userCartId: userId });
};


// Abonnement aux changements d'état de l'utilisateur connecté
auth.onAuthStateChanged((user) => {
  if (user) {
      // Utilisateur connecté, met à jour l'ID de l'utilisateur dans le panier
      updateUserIdInCart(user.uid);
  } else {
      // Utilisateur déconnecté, met à jour l'ID de l'utilisateur dans le panier à null
      updateUserIdInCart(null);
  }
});

// // Écouter les changements dans le panier et les sauvegarder dans le localStorage
useCartStore.subscribe((items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
});
