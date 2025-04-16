import React from "react";
import styles from "./Footer.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Sobre nós</h3>
          <p>
            Somos uma loja com o objetivo de proporcionar a melhor experiência
            de compra para nossos clientes. Aqui você encontra produtos de alta
            qualidade e durabilidade.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Inscreva-se</h3>
          <div className={styles.subscribe}>
            <input
              type="email"
              placeholder="Digite o seu Email"
              className={styles.input}
            />
            <button className={styles.button}>INSCREVER-SE</button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.socialIcons}>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-github"></i>
          </div>
          <h3>Precisa de ajuda?</h3>
          <p>
            Entre em contato conosco através do email ou telefone. Estamos
            sempre prontos para te ajudar!
          </p>
        </div>

        <div className={styles.section}>
          <h3>Contatos</h3>
          <p>
            <i className="bi bi-geo-alt-fill"></i> 123 Rua Principal, Cidade,
            Estado 12345-678
          </p>
          <p>
            <i className="bi bi-telephone-fill"></i> +01 12345-6789
          </p>
          <p>
            <i className="bi bi-envelope-fill"></i> teste@email.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
