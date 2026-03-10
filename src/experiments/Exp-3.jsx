import React, { useState, useEffect } from 'react';

const createFetchTracker = () => {
  let attempts = 0;
  return () => {
    attempts += 1;
    return attempts;
  };
};
const getFetchCount = createFetchTracker();

const SkeletonCard = () => (
  <div style={{ 
    border: '1px solid #444', padding: '1.5rem', borderRadius: '12px', 
    marginBottom: '1rem', background: '#333', width: '400px' 
  }}>
    <div style={{ height: '20px', width: '70%', background: '#444', margin: '0 auto' }}></div>
  </div>
);

const ProductCard = ({ title, category }) => (
  <div style={{ 
    border: '1px solid #ddd', 
    padding: '1.5rem', 
    borderRadius: '12px', 
    marginBottom: '1rem', 
    width: '400px', 
    textAlign: 'center', 
    backgroundColor: '#fff', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
  }}>
    <h3 style={{ 
      margin: '0 0 10px 0', 
      color: '#000000', 
      fontSize: '1.1rem' 
    }}>
      {title}
    </h3>
    <p style={{ 
      margin: '0', 
      color: '#007bff', 
      fontWeight: 'bold', 
      fontSize: '0.8rem', 
      textTransform: 'uppercase' 
    }}>
      {category.toUpperCase()}
    </p>
  </div>
);

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const count = getFetchCount();
    try {
      const res = await fetch('https://dummyjson.com/products?limit=5');
      const data = await res.json();
      setProducts(data.products);
      setAttempts(count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      paddingTop: '50px'
    }}>
      {/* This inner div is your catalog block */}
      <div style={{ width: '400px' }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>Product Catalog</h1>
        
        {loading ? (
          [1, 2, 3, 4, 5].map(n => <SkeletonCard key={n} />)
        ) : (
          products.map(p => <ProductCard key={p.id} title={p.title} category={p.category} />)
        )}
      </div>
    </div>
  );
};

export default ProductContainer;