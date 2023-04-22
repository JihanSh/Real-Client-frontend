import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
// import Category from "./pages/category/Category";

import Auth from "./pages/Auth/auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="auth" element={<Auth />} />
          <Route path="product/:productId" element={<Product />} />
          {/* <Route path="category/:categoryId" element={<Category />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
