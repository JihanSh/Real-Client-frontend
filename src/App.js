import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/auth";
import User from "./pages/userProfile/profile";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import NotFound from "./pages/notFound/NotFound";
import Category from "./pages/category/Category";
import ProductDashboard from "./pages/productDashboard/productDashboard";
import Sale from "./pages/sale/Sale";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="sale" element={<Sale />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="proDash" element={<ProductDashboard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="auth" element={<Auth />} />
          <Route path="User" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
