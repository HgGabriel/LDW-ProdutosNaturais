import styles from "./HeaderNav.module.css"
import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';


const HeaderNav: React.FC = () => {
    return (
        <nav className={styles.headerNav}>
            <img src="./logo.png" alt="" />
            <ul>
                <li>Home</li>
                <li>Categorias</li>
                <li>Sobre</li>
                <li>Blog</li>
            </ul>
            <div className={styles.search}>
                <input type="text" placeholder="Pesquisar..." />
            <i className="bi bi-search"></i>
            </div>
            <img src="./logo.png" alt="" />
        </nav>
    )
}

export default HeaderNav