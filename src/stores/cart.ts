
import { create } from 'zustand';
import { IProduct } from '../types/product.types';


interface CartItem extends IProduct {
    count: number;
}

type CartStore = {
    cart: CartItem[],
    count: () => number;
    add: (product: IProduct) => void,
    remove: (idProduct: string) => void,
    removeAll: () => void,
    totalPrice : () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get();
        if (cart.length)
            return cart.map(item => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    
    add: (product: IProduct) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart)
        set({ cart: updatedCart });
    },

    remove: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),

    totalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, cartItem) => {
          const itemPrice = cartItem.reduction !== 0
            ? cartItem.price - cartItem.price * (cartItem.reduction / 100)
            : cartItem.price;
          return total + itemPrice * cartItem.count;
        }, 0);
      },
}));

function updateCart(product: IProduct, cart: CartItem[]): CartItem[] {
    const cartItem = { ...product, count: 1 } as CartItem;

    const productOnCart = cart.map(item => item.id).includes(product.id);
    
    if (!productOnCart) cart.push(cartItem)
    else {
        return cart.map(item => {
            if (item.id === product.id)
                return { ...item, count: item.count + 1 } as CartItem;
            return item
        })        
    }
    
    return cart;
}

function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.id === idProduct)
            return { ...item, count: item.count - 1 }
        return item;
    }).filter(item => {
        return item.count;
    });
}
  
// Abonnement aux changements dans le panier et sauvegarde dans le localStorage
useCartStore.subscribe((cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
});

const initialCart = localStorage.getItem("cart");
if (initialCart) {
    useCartStore.setState(JSON.parse(initialCart));
}