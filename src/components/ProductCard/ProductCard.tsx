import React from "react";
import styles from "./ProductCard.module.css";
import { product } from "../../types";
import { trimText } from "../../utils";
import { useNavigate } from "react-router";
import { Rating } from "react-simple-star-rating";

interface ProductCardProps {
  product: product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const navigate  = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className={styles.productCard} onClick={handleClick}>
      <img className={styles.image} src={product.image} alt={product.name} />
      <div className={styles.info}>
        <h2 className={styles.name}>{trimText(product.name, 22)}</h2>
        <span className={styles.price}>R$ {product.price}</span>
        <Rating initialValue={product.rating} allowFraction readonly size={16} />
      </div>
    </div>
  );
};

export default ProductCard;
