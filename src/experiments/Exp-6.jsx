import React, { useEffect, useRef, useState } from 'react';

// Closure-based in-memory cache
const createProductCache = () => {
  let products = null;
  let lastFetchedAt = 0;
  let fetchCount = 0;

  const getStats = () => ({ lastFetchedAt, fetchCount });
  const getCached = () => {
    if (!products) return null;
    const isStale = Date.now() - lastFetchedAt > 60_000;
    return { products, isStale };
  };
  const setCache = (newProducts) => {
    products = newProducts;
    lastFetchedAt = Date.now();
    fetchCount += 1;
  };

  return { getCached, setCache, getStats };
};

const productCache = createProductCache();

// Smart hook: handles race conditions, stale state, caching
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const currentRequestId = useRef(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setStatus("loading");
      setError(null);

      // Cache first
      const cached = productCache.getCached();
      if (cached && !cached.isStale) {
        setProducts(cached.products);
        setStatus("success");
        setFromCache(true);
        return;
      }

      // Network request with race protection
      const requestId = ++currentRequestId.current;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch("https://dummyjson.com/products", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();

        if (!isMounted || requestId !== currentRequestId.current) return;

        productCache.setCache(json.products);
        setProducts(json.products);
        setStatus("success");
        setFromCache(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!isMounted) return;
        setError(err.message || "Failed to load");
        setStatus("error");
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { products, status, error, fromCache, stats: productCache.getStats() };
};

// Dumb presentational components
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
    {products.map((p) => (
      <ProductCard
        key={p.id}
        title={p.title}
        price={p.price}
        description={p.description}
        thumbnail={p.thumbnail}
      />
    ))}
  </section>
);

const ProductSkeleton = () => (
  <div className="product-card skeleton">
    <div className="image-placeholder" />
    <div className="line line-title" />
    <div className="line line-price" />
    <div className="line line-desc" />
  </div>
);

// Main container (smart) component
const ProductListPage = () => {
  const { products, status, error, fromCache, stats } = useProducts();

  if (status === "loading") {
    return (
      <main>
        <h2>Products</h2>
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      </main>
    );
  }

  if (status === "error") {
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
        <h2>Products</h2>
        <small>
          {fromCache ? "Cache" : "Network"} • Fetches: {stats.fetchCount}
        </small>
      </header>
      <ProductListView products={products} />
    </main>
  );
};

// Root export
export default ProductListPage;

// Basic CSS (inline or add to your CSS file)
const styles = `
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.product-card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
.product-image { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
.price { font-weight: bold; color: #007bff; font-size: 1.2em; }
.skeleton .image-placeholder { height: 200px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
.skeleton .line { height: 1rem; background: #f0f0f0; border-radius: 4px; margin: 0.5rem 0; }
.line-title { width: 80%; }
.line-price { width: 50%; }
.line-desc { width: 100%; }
@keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.error { color: #dc3545; }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
}
