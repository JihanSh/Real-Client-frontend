import React from "react";
import { Link } from "react-router-dom";
import "./HeaderNavbar.css";
// import logo from "./JONCO_logo.png";
import logo2 from "../Header/images/LOGO_WATERMARK.png";
import menu from "../Header/images/Menu.png";
import cart from "../Header/images/icons8-cart-64.png";
import user from "../Header/images/icons8-user-32 .png";

const HeaderNavbar = ({ setMenuBar, menubar }) => {
  return (
    <div className="navbiggerthing">
      <div className="navnavbar">
        <div>
          <img src={logo2} alt="JoncoMET" className="navnavbar-logo" />
        </div>
        <div className="navnavbar-list">
          <button className="navnavbar-button">
            <Link to="/">Home</Link>
          </button>
          <button className="navnavbar-button">
            <Link to="/about">About Us</Link>
          </button>
        </div>
        <div className="navnavbar-contact">
          <button className="navcontact-button">
            <Link to="/cart">
              <img className="cart" src={cart} alt="#" />
            </Link>
          </button>
          <button className="navcontact-button">
            <Link to="/register">
              <img src={user} alt="#" />
            </Link>
          </button>
        </div>
        <div className="navnavbar-menu">
          <button className="navmenu-button" id="navmenuButton">
            <img
              src={menu}
              alt="menu"
              className="navmenu"
              onClick={() => setMenuBar(!menubar)}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuBar = ({ menubar }) => {
  return (
    <div className={!menubar ? "navhidden_hidden" : "navhidden_show"} menubar>
      <button className="navmenu-menu">
        <Link to="/">Home</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/about">About Us</Link>
      </button>
    </div>
  );
};
export { HeaderNavbar, MenuBar };
