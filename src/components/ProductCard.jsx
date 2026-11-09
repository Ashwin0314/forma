
import React from "react";

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart
}) {
  const favorite = wishlist.some(
    item => item.id === product.id
  );

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className={`heart ${favorite ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

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
    </div>
  );
}

export default ProductCard;
