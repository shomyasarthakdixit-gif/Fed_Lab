import React, { useEffect, useRef, useState } from 'react';

// Closure to track fetch attempts and timestamp
const createFetchTracker = () => {
  let fetchCount = 0;
  let lastFetchTime = 0;

  const trackFetch = () => {
    fetchCount += 1;
    lastFetchTime = Date.now();
  };

  const getStats = () => ({ fetchCount, lastFetchTime });

  return { trackFetch, getStats };
};

const fetchTracker = createFetchTracker();

// Dumb presentational components (props only)
const ProductCard = ({ title, price, description, thumbnail }) => (
  <article className="product-card">
    <img src={thumbnail} alt={title} className="product-image" />
    <h3>{title}</h3>
    <p className="price">${price}</p>
    <p>{description}</p>
  </article>
);

const ProductListView = ({ products }) => (
  <section className="product-grid">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        thumbnail={product.thumbnail}
      />
    ))}
  </section>
);

const ProductSkeleton = ({ count = 8 }) => (
  <section className="product-grid">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="product-card skeleton">
        <div className="skeleton-image" />
        <div className="skeleton-line title" />
        <div className="skeleton-line price" />
        <div className="skeleton-line desc" />
      </div>
    ))}
  </section>
);

// Smart container: fetches data, manages state
const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ fetchCount: 0, lastFetchTime: 0 });

  useEffect(() => {
    // Async/await + promise chaining demo
    const fetchProducts = async () => {
      fetchTracker.trackFetch(); // Closure tracks attempts
      
      try {
        setLoading(true);
        setError(null);
        
        // Async/await
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        // Promise chaining
        const data = await response
          .json()
          .then(json => json.products)
          .catch(err => {
            throw new Error('JSON parse failed');
          });
        
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setStats(fetchTracker.getStats()); // Closure state
      }
    };

    fetchProducts();
  }, []);

  // Re-rendering happens when products/loading state changes

  if (loading) {
    return (
      <main>
        <h2>Products Loading...</h2>
        <ProductSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>Products</h2>
        <p className="error">Error: {error}</p>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h2>Products ({products.length})</h2>
        <div className="stats">
          Fetches: {stats.fetchCount} | Last: {new Date(stats.lastFetchTime).toLocaleTimeString()}
        </div>
      </header>
      <ProductListView products={products} />
    </main>
  );
};

// Root component
const App = () => <ProductContainer />;

export default App;

// Inline CSS for complete demo
const css = `
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 2rem 0;
  }
  .product-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }
  .product-card:hover { transform: translateY(-2px); }
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .price {
    font-weight: 700;
    color: #10b981;
    font-size: 1.3em;
    margin: 0.5rem 0;
  }
  h3 { margin: 0 0 0.5rem 0; color: #1f2937; }
  p { margin: 0; color: #6b7280; }
  
  /* Skeleton */
  .skeleton {
    background: linear-gradient(90deg, #f5f5f5 25%, #e5e5e5 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  .skeleton-image { height: 200px; border-radius: 8px; }
  .skeleton-line {
    height: 16px;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }
  .skeleton-line.title { width: 70%; }
  .skeleton-line.price { width: 40%; }
  .skeleton-line.desc { width: 100%; }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .error { color: #ef4444; padding: 1rem; background: #fee2e2; border-radius: 8px; }
  .stats { 
    background: #f3f4f6; 
    padding: 0.5rem 1rem; 
    border-radius: 6px; 
    font-size: 0.9em; 
    color: #6b7280; 
  }
  main { max-width: 1400px; margin: 0 auto; padding: 2rem; }
  header { margin-bottom: 2rem; }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
