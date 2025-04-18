import { BrowserRouter as Router, Routes, Route } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<Home/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
          <Route path="cart" element={<Cart/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;