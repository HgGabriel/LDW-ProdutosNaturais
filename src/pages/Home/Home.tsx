import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Home.module.css";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import { categoryData } from "../../data/categoryData";
import ProductCard from "../../components/ProductCard/ProductCard";
import { shuffleArray } from "../../utils";
import { product } from "../../types";

const Home: React.FC = () => {
  const { trendingCategories, currentCategory } = useAppContext();
  const [currentSubCategory, setCurrentSubCategory] =
    React.useState<string>("");

  const [promoProducts, setPromoProducts] = React.useState<product[]>([]);

  useEffect(() => {
    setPromoProducts(shuffleArray(categoryData[currentCategory].products));
    console.log(categoryData[currentCategory].products);
  }, [currentCategory]);

  useEffect(() => {
    console.log(currentSubCategory);
  }, [currentSubCategory]);

  return (
    <div className={styles.homeContainer}>
      <HomeBanner />
      <h1>Destaques</h1>
      <div className={styles.trendingCategories}>
        {trendingCategories &&
          trendingCategories.map((category, index) => (
            <div
              onClick={() => {
                setCurrentSubCategory(category.name);
              }}
              key={index}
              className={styles.categoryItem}
              style={
                currentSubCategory === category.name
                  ? { borderBottom: "2px solid #000" }
                  : {}
              }
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))}
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.productsList}>
          {categoryData[currentCategory]?.products
            .filter(
              (product) =>
                !currentSubCategory ||
                product.subCategory.toLowerCase() ===
                  currentSubCategory.toLowerCase()
            )
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
        <div className={styles.seeMore}>
          <span>Ver mais</span>
        </div>
      </div>
      <h1>Promoções</h1>
      <div className={styles.productsContainer}>
        <div className={styles.productsList}>
          {promoProducts.slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      <div className={styles.seeMore}>
        <span>Ver mais</span>
      </div>
      </div>
    </div>
  );
};
export default Home;
