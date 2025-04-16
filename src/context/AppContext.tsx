import React, { useEffect, useState, createContext, useContext } from "react";
import { categoryData, categoryItem } from "../data/categoryData";

type AppContextType = {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  trendingCategories?: categoryItem[];
  scrollPosition: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState("cosmetics"); // valor padrão
  const [trendingCategories, setTrendingCategories] = useState<categoryItem[]>([]);
  
  //get scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const root = document.documentElement;
    const data = categoryData[currentCategory];

    if (data) {
      root.style.setProperty("--primary-color", data.primaryColor);
      root.style.setProperty("--secondary-color", data.secondaryColor);
      root.style.setProperty("--primary-hover", data.primaryHover);
      root.style.setProperty("--accent-color", data.accentColor);
      root.style.setProperty("--accent-bg", data.accentBg);
      root.style.setProperty("--text-color", data.textColor);
      root.style.setProperty("--muted-text-color", data.mutedTextColor);

      setTrendingCategories(data.subCategories);
    }
  }, [currentCategory]);

  return (
    <AppContext.Provider
      value={{
        currentCategory,
        setCurrentCategory,
        search,
        setSearch,
        trendingCategories,
        scrollPosition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
