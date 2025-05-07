import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import styles from "./HeaderNav.module.css";
import React, { useEffect } from "react";
import { brandLogo } from "../../data/images";

const menuItems = [
  { label: "Home", action: (navigate: any) => navigate("/") },
  {
    label: "Categorias",
    submenu: [
      { label: "Cosméticos", category: "cosmetics" },
      { label: "Alimentos", category: "foods" },
      { label: "Suplementos", category: "supplements" },
    ],
  },
  { label: "Favoritos", action: (navigate: any) => navigate("/favorites") },
  { label: "Blog" },
];

const HeaderNav: React.FC = () => {
  const { setCurrentCategory, scrollPosition, cart, setSearch, search } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.split("/")[1];

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])

  return (
    <nav
      className={styles.headerNav}
      style={
        scrollPosition > 0
          ? { borderRadius: "50px", width: "98%", margin: "20px" }
          : {}
      }
    >
      <img onClick={() => navigate("/")} src={brandLogo} alt="Logo" />

      <ul className={styles.headerNav__navList}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={item.submenu ? styles.dropdown : ""}
            onClick={
              item.action
                ? () => {
                    item.action(navigate);
                  }
                : item.submenu
                ? undefined
                : () => {}
            }
            style={{
              borderBottom:
                item.label === "Home" && currentPage === ""
                  ? "2px solid #000"
                  : "none",
            }}
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
        <input type="text" placeholder="Pesquisar..." onChange={(e) => setSearch(e.target.value)} value={search} />
        <i className="bi bi-search"></i>
      </div>

      <div className={styles.headerNav__icon} onClick={() => navigate("/cart")}>
        <i className="bi bi-bag-fill" />
        {cart.length > 0 && (
          <span className={styles.headerNav__cartCount}>{cart.length}</span>
        )}
      </div>
    </nav>
  );
};

export default HeaderNav;
