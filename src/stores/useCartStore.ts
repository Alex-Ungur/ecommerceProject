import { create } from "zustand";

// type ICart = {
//   date: Date;
//   id: number;
//   products: [];
//   userId: number;
// };

type ICartProduct = {
    productId: number;
    name : string;
    image : string;
    quantity: number;
    price : number;
};

type IAddCartItem = {
    items : ICartProduct[]
    addItem : (item : ICartProduct) => void
    removeItem : (productId : number) => void
    totalPrice: () => number
    totalQuantity : () => number
}

export const useCartStore = create<IAddCartItem>((set, get) => ({
    items : [], 
    addItem: (item: ICartProduct) =>
    set((state) => {
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
    removeItem : (productId : number) => set((state) => ({items : state.items.filter((item) => item.productId !== productId)})),
    totalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity : () => get().items.reduce((quantity, item) => quantity + item.quantity, 0)

}));