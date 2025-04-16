import { BrowserRouter as Router, Routes, Route } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<Home/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;