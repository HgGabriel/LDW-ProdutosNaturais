import React from 'react';
import { Outlet } from 'react-router';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import styles from './DefaultLayout.module.css';
import Footer from '../components/Footer/Footer';
import { useAppContext } from '../context/AppContext';
const DefaultLayout: React.FC = () => {
  const {scrollPosition} = useAppContext();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <HeaderNav />
      </header>
      <main className={styles.main} style={scrollPosition < 50 ? {marginTop: "80px"} : {}}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;