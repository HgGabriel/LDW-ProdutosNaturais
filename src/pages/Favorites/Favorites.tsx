import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Favorites.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { categoryData } from "../../data/categoryData";
import { product } from "../../types";

const Favorites: React.FC = () => {
  const { search } = useAppContext();
  const [filteredDisplayedProducts, setFilteredDisplayedProducts] = useState<product[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const allProducts = Object.values(categoryData).flatMap((category) => category.products);
    
    allProducts.forEach((product) => {
      console.log(product.name);
    })

    const favoriteProducts = allProducts.filter((product) =>
      favorites.includes(product.id.toString())
    );
    
    favoriteProducts.forEach((product) => {
      console.log("Favorito: " + product.name);
    })

    const filteredProducts = favoriteProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredDisplayedProducts(filteredProducts);
  }, [search]);

  return (
    <div className={styles.productListContainer}>
      <div className={styles.productList}>
        {filteredDisplayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
