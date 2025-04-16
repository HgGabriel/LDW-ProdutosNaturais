import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/swiper-bundle.css"
import styles from "./HomeBanner.module.css";
import { categoryData } from "../../data/categoryData";
import { useAppContext } from "../../context/AppContext";

const HomeBanner: React.FC = () => {

  const {currentCategory} = useAppContext();
  return (
    <div className={styles.bannerContainer}>
      <Swiper className={styles.swiper}>
        <SwiperSlide>
          <img src={categoryData[currentCategory].banner} alt="Banner 1" />
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
};

export default HomeBanner;
