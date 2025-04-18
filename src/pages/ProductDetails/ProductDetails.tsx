import React, { useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./ProductDetails.module.css";
import { categoryData } from "../../data/categoryData";
import { Rating } from "react-simple-star-rating";
import { useAppContext } from "../../context/AppContext";

const ProductDetails: React.FC = () => {
  const [selectedSection, setSelectedSection] = React.useState<string>("description");
  const id = location.pathname.split("/").pop();
  const { favorites, setFavorites, cart, setCart } = useAppContext();
  
  useEffect(() => {
    cart.forEach((item) => {
      console.log(item)
    })}, [cart]);


  const product = Object.values(categoryData)
    .flatMap((category) => category.products)
    .find((product) => product.id.toString() === id);

  if (!product) return <p>Produto não encontrado.</p>;

  const productId = product.id;
  const isFavorite = favorites.includes(productId);
  const isInCart = cart.some((item) => item.product.id === productId);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(productId)
    ? prev.filter((id) => id !== productId)
    : [...prev, productId]
  );
};

const handleCartToggle = () => {
  const action = isInCart ? "remover do carrinho" : "adicionar ao carrinho";

  Swal.fire({
    title: `Deseja ${action}?`,
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="${product.image}" alt="${product.name}" style="width: 120px; height: auto; border-radius: 10px; margin-bottom: 12px;" />
        <h3 style="margin: 0;">${product.name}</h3>
        <p style="font-size: 18px; color: #555;">R$ ${product.price.toFixed(2)}</p>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "var(--secondary-color)",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      if (isInCart) {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
      } else {
        setCart((prev) => [...prev, { product, quantity: 1 }]);
      }

      Swal.fire({
        title: isInCart ? "Removido!" : "Adicionado!",
        text: `Produto ${isInCart ? "removido" : "adicionado"} com sucesso.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
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
              style={{ opacity: selectedSection === section ? "1" : "0.5", fontWeight: selectedSection === section ? "bold" : "normal" }}
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
          <button className={styles.cartButton} onClick={handleCartToggle}>
            <i className="bi bi-cart-fill"></i>
            <p>{isInCart ? "REMOVER DO CARRINHO" : "ADICIONAR AO CARRINHO"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
