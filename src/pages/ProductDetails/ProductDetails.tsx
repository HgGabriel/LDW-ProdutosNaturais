import React from "react";
import styles from "./ProductDetails.module.css";
import { categoryData } from "../../data/categoryData";
import { Rating } from "react-simple-star-rating";
import { useAppContext } from "../../context/AppContext";

const ProductDetails: React.FC = () => {
  const [selectedSection, setSelectedSection] = React.useState<string>("description");
  const id = location.pathname.split("/").pop();
  const { favorites, setFavorites, cart, setCart } = useAppContext();

  const product = Object.values(categoryData)
    .flatMap((category) => category.products)
    .find((product) => product.id.toString() === id);

  if (!product) return <p>Produto não encontrado.</p>;

  const productId = product.id.toString();
  const isFavorite = favorites.includes(productId);
  const isInCart = cart.includes(productId);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCart = () => {
    setCart((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        <div className={styles.favoriteIcon} onClick={toggleFavorite}>
          <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </div>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={styles.detailsSection}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h1 className={styles.name}>{product.name}</h1>

        <div className={styles.rating}>
          <p className={styles.price}>R$ {product.price}</p>
          <Rating
            showTooltip
            initialValue={product.rating}
            readonly
            allowFraction
            size={25}
          />
        </div>

        <div className={styles.sections}>
          {["description", "howToUse", "ingredients", "reviews"].map((section) => (
            <div
              key={section}
              className={styles.section}
              onClick={() => setSelectedSection(section)}
              style={{ opacity: selectedSection === section ? "1" : "0.2" }}
            >
              <p className={styles.sectionText}>
                {{
                  description: "Descrição",
                  howToUse: "Como usar",
                  ingredients: "Ingredientes",
                  reviews: "Avaliações",
                }[section]}
              </p>
            </div>
          ))}
        </div>

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
          <button className={styles.favButton} onClick={toggleFavorite}>
            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
            <p>{isFavorite ? "REMOVER DOS FAVORITOS" : "ADICIONAR AOS FAVORITOS"}</p>
          </button>
          <button className={styles.cartButton} onClick={toggleCart}>
            <i className="bi bi-cart-fill"></i>
            <p>{isInCart ? "REMOVER DO CARRINHO" : "ADICIONAR AO CARRINHO"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
