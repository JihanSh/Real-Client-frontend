import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Product from "./pages/product/Product";
import { HeaderNavbar, MenuBar } from '../src/component/Header/HeaderNavbar';
import {Footer} from './component/Header/footer/footer';
import { useState } from "react";
import Auth from "./pages/Auth/auth";

function App() {
  const [menubar, setMenuBar] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>
        <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
        <MenuBar menubar={menubar} />
        <Footer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product" element={<Product />} />
          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
