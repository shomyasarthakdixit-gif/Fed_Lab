import React, { useState } from "react";

/* ---------------- ProductCard ---------------- */

function ProductCard({ product, onAddToCart }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>

      <button
        style={styles.button}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

/* ---------------- ProductList ---------------- */

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Product List</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CartSummary ---------------- */

function CartSummary({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.cart}>
      <h2>Cart Summary</h2>
      <p>Items in Cart: {cart.length}</p>
      <p>Total Price: ₹{total}</p>
    </div>
  );
}

/* ---------------- Main Experiment Component ---------------- */

function Exp9() {

  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Smartphone", price: 25000 },
    { id: 3, name: "Headphones", price: 3000 },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={styles.container}>

      <h1>Experiment 9</h1>
      <h3>
        Unit and Integration Testing of React Components using Jest and React Testing Library
      </h3>

      <p>
        This experiment demonstrates testing of React components such as
        ProductCard, ProductList, and CartSummary. Unit testing verifies
        individual component behavior while integration testing verifies
        interactions between multiple components.
      </p>

      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
      />

      <CartSummary cart={cart} />

    </div>
  );
}

export default Exp9;


/* ---------------- Styles ---------------- */

const styles = {

  container: {
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial"
  },

  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },

  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    width: "200px",
    textAlign: "center"
  },

  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  cart: {
    marginTop: "30px",
    padding: "15px",
    border: "2px solid #333",
    borderRadius: "8px"
  }

};