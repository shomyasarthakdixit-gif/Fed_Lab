import React, { useState, useEffect } from "react";

function Exp3_ProductFetch() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div>
      <h2>Experiment 3 – Product Fetch</h2>

      {products.slice(0,5).map(p => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

export default Exp3_ProductFetch;