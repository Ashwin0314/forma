
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ wishlistCount, cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ShopEasy
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/wishlist">
          ❤️ Wishlist ({wishlistCount})
        </Link>
        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
