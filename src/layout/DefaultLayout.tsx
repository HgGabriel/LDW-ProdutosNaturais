import React from 'react';
import { Outlet } from 'react-router';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import styles from './DefaultLayout.module.css';
const DefaultLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <HeaderNav />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer>
        {/*<Footer />*/}
      </footer>
    </div>
  );
};

export default DefaultLayout;