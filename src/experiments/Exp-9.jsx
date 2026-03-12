import React, { useState } from "react";

function Exp9() {
  const products = ["Laptop", "Phone", "Headphones"];
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div>
      <h2>Product List</h2>

      {products.map((product, index) => (
        <div key={index}>
          <p>{product}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      ))}

      <h3>Items in Cart: {cartCount}</h3>
    </div>
  );
}

export default Exp9;