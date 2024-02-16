import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export interface Product {
    category: string
    description: string
    price: number
    image: File
    promo: number
    rating : {
        count : number,
        rate : number
    }
    title: string
  }
  



export const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => (json))
    .catch(error => console.error(error));

    return response;
}


export const getProduct =async (id : string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => (json))
    .catch(error => console.error(error));
    return response;
}

export const getProductsFb = async () => {

    const products = collection(db, "produits");
    const productsList = await getDocs(products);
    return (productsList.docs.map((product) => ({...product.data(), id : product.id})));

    
}
export const getProductFb = async (id : string) => {

    const products = collection(db, "produits");
    const productsList = await getDocs(products);
    const allProducts = productsList.docs.map((product) => ({...product.data(), id : product.id}));
    // console.log(id);
    const productItem = allProducts.filter((product) => product.id === id);
    // console.log(productItem);
    return productItem

    
}

export const getCategories = async () => {

    const categories = collection(db, "categories");
    const categoriesList = await getDocs(categories);
    return (categoriesList.docs.map((category) => ({...category.data(), id : category.id})));

    
}

export const setProduct = async (data : Product) => {
    const setProductData = await addDoc(collection(db, "produits"), {
        category : data.category,
        description : data.description,
        image : data.image.name,
        price : data.price,
        promo : data.promo,
        rating : {count : data.rating.count, rate : data.rating.rate},
        title : data.title
    });

    return setProductData;
}