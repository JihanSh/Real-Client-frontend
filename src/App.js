import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Product from "./pages/product/Product";
import NotFound from "./pages/notFound/NotFound";
import Category from "./pages/category/Category";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductDashboard from "./pages/productDashboard/productDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="*" element={<NotFound />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="proDash" element={<ProductDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
