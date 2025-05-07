import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./ProductList.module.css";
import { product } from "../../types";
import ProductCard from "../../components/ProductCard/ProductCard";
import { categoryData } from "../../data/categoryData";
import { shuffleArray } from "../../utils";

const ProductList: React.FC = () => {
  const { currentCategory, search } = useAppContext();
  const currentProducts = categoryData[currentCategory].products;
  const [displayedProducts, setDisplayedProducts] = useState<product[]>([]);
  const [filteredDisplayedProducts, setFilteredDisplayedProducts] = useState<product[]>([]);
  useEffect(() => {
    setDisplayedProducts(shuffleArray(currentProducts));
  }, []);

  useEffect(() => {
    const filteredProducts = displayedProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDisplayedProducts(filteredProducts);
  }, [search, displayedProducts]);
  return(
    <div className={styles.productListContainer}>
      <div className={styles.productList}>
        {filteredDisplayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;