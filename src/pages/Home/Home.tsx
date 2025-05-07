import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Home.module.css";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import { categoryData } from "../../data/categoryData";
import ProductCard from "../../components/ProductCard/ProductCard";
import { shuffleArray } from "../../utils";
import { product } from "../../types";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const { trendingCategories, currentCategory } = useAppContext();
  const [currentSubCategory, setCurrentSubCategory] =
    React.useState<string>(categoryData[currentCategory].subCategories[0]?.name || "");

  const [promoProducts, setPromoProducts] = React.useState<product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPromoProducts(shuffleArray(categoryData[currentCategory].products));
    console.log(categoryData[currentCategory].products);
  }, [currentCategory]);

  useEffect(() => {
    console.log(currentSubCategory);
  }, [currentSubCategory]);

  useEffect(() => {
    if (currentCategory === "cosmetics") { 
      setCurrentSubCategory(categoryData[currentCategory].subCategories[0]?.name || "");
    }

    if (currentCategory === "supplements") {
      setCurrentSubCategory(categoryData[currentCategory].subCategories[0]?.name || "");
    }

    if (currentCategory === "foods") {
      setCurrentSubCategory(categoryData[currentCategory].subCategories[0]?.name || "");
    }
  }, [currentCategory]);

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
        <div onClick={() => {
            navigate("/list")
          }} className={styles.seeMore}>
          <span >Ver mais</span>
        </div>
      </div>
      <h1>Promoções</h1>
      <div className={styles.productsContainer}>
        <div className={styles.productsList}>
          {promoProducts.slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <div className={styles.productsList}>
          {promoProducts.slice(5, 10).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      <div onClick={() => {
            navigate("/list")
          }} className={styles.seeMore}>
        <span >Ver mais</span>
      </div>
      </div>
    </div>
  );
};
export default Home;
