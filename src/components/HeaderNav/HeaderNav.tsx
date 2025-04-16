import { useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import styles from "./HeaderNav.module.css";
import React from "react";

const HeaderNav: React.FC = () => {
  const {setCurrentCategory, scrollPosition} = useAppContext();
  const navigate = useNavigate();

  
  return (
    <nav className={styles.headerNav} 
      style={scrollPosition > 0 ? { borderRadius: "50px", width:"98%", margin:"20px" } : {}}
    >
      <img  onClick={() => navigate("/")} src="./logo.png" alt="" />
      <ul className={styles.navList}>
        <li onClick={() => navigate("/")}>Home</li>
        <li className={styles.dropdown}>
          Categorias
          <ul className={styles.submenu}>
            <li onClick={() => setCurrentCategory('cosmetics') }>Cosméticos</li>
            <li onClick={() => setCurrentCategory('supplements') }>Suplementos</li>
            <li onClick={() => setCurrentCategory('foods') }>Alimentos</li>
          </ul>
        </li>
        <li>Sobre</li>
        <li>Blog</li>
      </ul>

      <div className={styles.search}>
        <input type="text" placeholder="Pesquisar..." />
        <i className="bi bi-search"></i>
      </div>
      <i className="bi bi-cart-fill"></i>
    </nav>
  );
};

export default HeaderNav;
