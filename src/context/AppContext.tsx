import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { categoryData, categoryItem } from "../data/categoryData";
import { cartItem } from "../types";

type AppContextType = {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  trendingCategories: categoryItem[];
  scrollPosition: number;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  cart: cartItem[];
  setCart: React.Dispatch<React.SetStateAction<cartItem[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [search, setSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState("cosmetics");
  const [trendingCategories, setTrendingCategories] = useState<categoryItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<cartItem[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFavorites = localStorage.getItem("favorites");
        const storedCart = localStorage.getItem("cart");

        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Erro ao carregar localStorage:", error);
      } finally {
        setFavoritesLoaded(true);
        setCartLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (favoritesLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, favoritesLoaded]);

  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, cartLoaded]);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        favorites,
        setFavorites,
        cart,
        setCart,
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
