
import React from "react";

function Wishlist({
  wishlist,
  removeWishlist,
  addToCart
}) {
  return (
    <main className="container">
      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <div className="empty">
          <h1>♡</h1>
          <h3>Your wishlist is empty!</h3>
          <p>Add your favorite products here.</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeWishlist(product.id)}
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
