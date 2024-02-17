// import { useCartStore } from "../stores/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { getProductsFb } from "../api/Products";
import { useMemo, useState } from "react";
import { IProduct } from "../types/product.types";
import ProductItem from "./ProductItem";

const Products = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [searchCategoryFilter, setSearchCategoryFilter] = useState("");

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

  // Créer un ensemble de catégories uniques à partir de la productList
  const uniqueCategories: string[] = useMemo(() => {
    if (!productsFBDb) return [];
    const categories: string[] = [];
    (productsFBDb as IProduct[]).forEach((productItem: IProduct) => {
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
  const filteredProducts = (productsFBDb as IProduct[])?.filter(
    (productItem: IProduct) => {
      const matchesSearchFilter = productItem.title
        .toLowerCase()
        .includes(searchFilter.toLowerCase());

      // Si une catégorie est sélectionnée, filtrer également par catégorie
      const matchesCategoryFilter =
        !searchCategoryFilter || // Si aucune catégorie n'est sélectionnée, inclure tous les produits
        productItem.category.toLowerCase() ===
          searchCategoryFilter.toLowerCase();

      return matchesSearchFilter && matchesCategoryFilter;
    }
  );

  // console.log(productsFBDb);
  // console.log(filteredProducts);
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
            value={searchCategoryFilter}
          >
            <option value="">Tous</option> {/* Option par défaut */}
            {uniqueCategories?.map((category: string) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts && filteredProducts.length > 0
          ? (filteredProducts as IProduct[])?.map((productItem: IProduct) => (
              <ProductItem key={productItem.id} productItem={productItem} />
            ))
          : "Aucun produit ne correspond à votre recherche..."}
      </ul>
    </>
  );
};

export default Products;
