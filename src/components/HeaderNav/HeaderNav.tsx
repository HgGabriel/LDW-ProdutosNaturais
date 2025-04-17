import { useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import styles from "./HeaderNav.module.css";
import React from "react";

const menuItems = [
  { label: "Home", action: (navigate: any) => navigate("/") },
  {
    label: "Categorias",
    submenu: [
      { label: "Cosméticos", category: "cosmetics" },
      { label: "Suplementos", category: "supplements" },
      { label: "Alimentos", category: "foods" },
    ],
  },
  { label: "Sobre" },
  { label: "Blog" },
];

const HeaderNav: React.FC = () => {
  const { setCurrentCategory, scrollPosition, cart, currentPage, setCurrentPage } = useAppContext();
  const navigate = useNavigate();

  return (
    <nav
      className={styles.headerNav}
      style={
        scrollPosition > 0
          ? { borderRadius: "50px", width: "98%", margin: "20px" }
          : {}
      }
    >
      <img onClick={() => navigate("/")} src="./logo.png" alt="Logo" />

      <ul className={styles.headerNav__navList}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={item.submenu ? styles.dropdown : ""}
            onClick={
              item.action
                ? () => item.action(navigate)
                : item.submenu
                ? undefined
                : () => {}
            }
          >
            {item.label}
            {item.submenu && (
              <ul className={styles.submenu}>
                {item.submenu.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => {
                      setCurrentCategory(sub.category);
                      navigate("/");
                    }}
                  >
                    {sub.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.headerNav__search}>
        <input type="text" placeholder="Pesquisar..." />
        <i className="bi bi-search"></i>
      </div>

      <div className={styles.headerNav__icon}>
        <i className="bi bi-cart-fill" />
        {cart.length > 0 && (
          <span className={styles.headerNav__cartCount}>{cart.length}</span>
        )}
      </div>
    </nav>
  );
};

export default HeaderNav;
