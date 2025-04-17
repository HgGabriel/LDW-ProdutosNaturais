import React from "react";
import styles from "./ProductDetails.module.css";
import { categoryData } from "../../data/categoryData";
import { Rating } from "react-simple-star-rating";

const ProductDetails: React.FC = () => {
  const [selectedSection, setSelectedSection] = React.useState<string>("description");
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

        <div className={styles.rating}>
          <p className={styles.price}>R$ {product.price}</p>
          <Rating showTooltip initialValue={product.rating} readonly allowFraction size={25} />
        </div>

        <div className={styles.sections}>
          <div
            className={styles.section}
            onClick={() => setSelectedSection("description")}
            style={{ opacity: selectedSection === "description" ? "1" : "0.2" }}
          >
            <p className={styles.sectionText}>Descrição</p>
          </div>
          <div
            className={styles.section}
            onClick={() => setSelectedSection("howToUse")}
            style={{ opacity: selectedSection === "howToUse" ? "1" : "0.2" }}
          >
            <p className={styles.sectionText}>Como usar</p>
          </div>
          <div
            className={styles.section}
            onClick={() => setSelectedSection("ingredients")}
            style={{ opacity: selectedSection === "ingredients" ? "1" : "0.2" }}
          >
            <p className={styles.sectionText}>Ingredientes</p>
          </div>
          <div
            className={styles.section}
            onClick={() => setSelectedSection("reviews")}
            style={{ opacity: selectedSection === "reviews" ? "1" : "0.2" }}
          >
            <p className={styles.sectionText}>Avaliações</p>
          </div>
        </div>
        {/* divider */}
        <div className={styles.divider}></div>
        <div className={styles.sectionContent}>
          {selectedSection === "description" && (
            <p className={styles.description}>{product.description}</p>
          )}
          {selectedSection === "howToUse" && (
            <p className={styles.howToUse}>{product.howToUse}</p>
          )}
          {selectedSection === "ingredients" && (
            <ul>
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul>
          )}
          {selectedSection === "reviews" && (
            <div className={styles.reviews}>
              Ainda não há avaliações para este produto.
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <button className={styles.favButton}>
            <i className="bi bi-heart"></i>
            <p>ADICIONAR A LISTA DE FAVORITOS</p>
          </button>
          <button className={styles.cartButton}>
            <i className="bi bi-cart-fill"></i>
            <p>ADICIONAR AO CARRINHO</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
