import { BrowserRouter as Router, Routes, Route } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home/Home";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;