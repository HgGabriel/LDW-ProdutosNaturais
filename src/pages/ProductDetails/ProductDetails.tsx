import React from "react";
import styles from "./ProductDetails.module.css";
import { categoryData } from "../../data/categoryData";
import { Rating } from "react-simple-star-rating";

const ProductDetails: React.FC = () => {
  const id = location.pathname.split("/").pop();

  const product = Object.values(categoryData).flatMap((category) =>
    category.products.filter((product) => product.id.toString() === id)
  )[0];

  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        <div className={styles.favoriteIcon}>
          <i className="bi bi-heart"></i>
        </div>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={styles.detailsSection}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>R$ {product.price}</p>

        <div className={styles.rating}>
          <Rating showTooltip initialValue={product.rating} readonly allowFraction size={25} />
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.buttons}>
          <button className={styles.favButton}>
            <i className="bi bi-heart-fill"></i> Favoritar
          </button>
          <button className={styles.cartButton}>
            <i className="bi bi-cart-plus"></i> Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
