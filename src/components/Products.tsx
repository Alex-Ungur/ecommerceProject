import { product } from "../App";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { Product, getProductsFb } from "../api/Products";
import { useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";

const Products = () => {
  const addItem = useCartStore((state) => state.addItem);
  const [searchFilter, setSearchFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState("");

  const style = {
    transform: isHovered ? `translate(5px, 5px)` : "",
    transition: `transform 0.3s`,
  };

  const {
    data: productsFBDb,
    isLoading,
    isFetching,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProductsFb(),
  });

  // const {
  //   isLoading,
  //   isFetching,
  //   isRefetching,
  //   error,
  //   data: productList,
  // } = useQuery({
  //   queryKey: ["productList"],
  //   queryFn: async () => await getProducts(),
  // });

  // Créer un ensemble de catégories uniques à partir de la productList
  const uniqueCategories: string[] = useMemo(() => {
    if (!productsFBDb) return [];
    const categories: string[] = [];
    productsFBDb.forEach((productItem: Product) => {
      if (!categories.includes(productItem.category)) {
        categories.push(productItem.category);
      }
    });
    return categories;
  }, [productsFBDb]);

  if (isLoading || isFetching || isRefetching) {
    return (
      <>
        <p>Chargement...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <p>Une erreur s'est produite</p>
      </>
    );
  }

  // Filtrer les produits en fonction de la catégorie sélectionnée
  const filteredProducts = productsFBDb?.filter((productItem: any) => {
    const matchesSearchFilter = productItem.title
      .toLowerCase()
      .includes(searchFilter.toLowerCase());

    // Si une catégorie est sélectionnée, filtrer également par catégorie
    const matchesCategoryFilter =
      !searchCategoryFilter || // Si aucune catégorie n'est sélectionnée, inclure tous les produits
      productItem.category.toLowerCase() === searchCategoryFilter.toLowerCase();

    return matchesSearchFilter && matchesCategoryFilter;
  });

  console.log(productsFBDb);
  console.log(filteredProducts);
  //TODO : Rating
  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <div className="">
          <label htmlFor="site-search" className="mr-1">
            Rechercher un produit
          </label>
          <input
            type="search"
            id="site-search"
            name="q"
            className="py-1 px-2 text-black"
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <div>
          <select
            className="py-1 px-2 text-black"
            onChange={(e) => setSearchCategoryFilter(e.target.value)}
            value={searchCategoryFilter} // Assurez-vous de contrôler la valeur de la liste déroulante
          >
            <option value="">Tous</option> {/* Option par défaut */}
            {uniqueCategories?.map(
              (category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
              // console.log(category)
            )}
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-5">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts?.map((productItem: any) => (
              <li
                key={productItem.id}
                className="h-full w-full border border-rose-500 p-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={style}
              >
                <Link
                  to={`/product/${productItem.id}`}
                  className="flex flex-col gap-2"
                >
                  <img
                    src={productItem.image}
                    alt={`${productItem.title} image`}
                    className="max-w-[12rem]"
                  />
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

                  {/* <p>{productItem.description}</p> */}
                </Link>
                <button
                  onClick={() => {
                    const newItem = {
                      productId: productItem.id,
                      name: productItem.title,
                      image: productItem.image,
                      price: productItem.price,
                      quantity: 1,
                    };
                    addItem(newItem);
                  }}
                >
                  Ajouter au panier
                </button>
              </li>
            ))
          : "Aucun produit ne correspond à votre recherche..."}
      </ul>
    </>
  );
};

export default Products;
