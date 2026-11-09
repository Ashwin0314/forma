
import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Minimal Sneakers", price: 2499, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", tag: "Bestseller" },
  { id: 2, name: "Classic Watch", price: 3999, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", tag: "Popular" },
  { id: 3, name: "Leather Backpack", price: 2999, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", tag: "New" },
  { id: 4, name: "Wireless Headphones", price: 4599, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", tag: "Trending" },
  { id: 5, name: "Modern Sunglasses", price: 1499, category: "Fashion", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", tag: "New" },
  { id: 6, name: "Premium Camera", price: 8999, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600", tag: "Popular" },
  { id: 7, name: "Minimal Chair", price: 5499, category: "Home", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600", tag: "Featured" },
  { id: 8, name: "Travel Backpack", price: 1999, category: "Accessories", image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600", tag: "Sale" },
];

const categories = ["All", "Fashion", "Electronics", "Accessories", "Home"];

export default function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="store">

      {/* Navbar */}
      <nav className="navbar">
        <a className="logo" href="#">forma<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#about">About</a>
        </div>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          Bag ({totalItems}) 🛍
        </button>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">THE NEW COLLECTION 2026</p>
          <h1>Find your<br />everyday style.</h1>
          <p>
            Discover thoughtfully selected products
            designed to make everyday living better.
          </p>
          <a href="#products" className="shop-button">
            Explore Collection →
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            alt="Modern fashion collection"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div>🚚 Free Shipping <small>On orders above ₹999</small></div>
        <div>↩ Easy Returns <small>7-day return policy</small></div>
        <div>🔒 Secure Payments <small>Safe checkout experience</small></div>
      </section>

      {/* Products */}
      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Discover our products.</h2>
          </div>
          <span>{filteredProducts.length} Products</span>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="tag">{product.tag}</span>
              </div>

              <div className="product-info">
                <div>
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>
                  <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                </div>

                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty">No products found. Try another search.</p>
        )}
      </section>

      {/* About */}
      <section className="about" id="about">
        <p className="eyebrow">OUR PHILOSOPHY</p>
        <h2>Less, but better.</h2>
        <p>
          We believe great products don't need to be complicated.
          Forma brings together quality, simplicity and timeless design.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <a className="logo" href="#">forma<span>.</span></a>
        <p>© 2026 Forma Store. All rights reserved.</p>
        <p>Made for everyday living.</p>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Shopping Bag</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <h3>Your bag is empty.</h3>
                <p>Discover something you love.</p>
                <button onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-details">
                        <h4>{item.name}</h4>
                        <p>₹{item.price.toLocaleString("en-IN")}</p>

                        <div className="quantity">
                          <button onClick={() => updateQuantity(item.id, -1)}>
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div>
                    <span>Subtotal</span>
                    <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                  </div>
                  <small>Shipping calculated at checkout.</small>
                  <button
                    className="checkout"
                    onClick={() => alert("Connect a payment gateway to enable checkout!")}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
