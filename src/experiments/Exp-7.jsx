// experiments/Exp-7.jsx
import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
} from "react-router-dom";

// ---------- Pages ----------
const Welcome = () => <h2>Welcome to Experiment 7</h2>;
const Home = () => <h2>Home Page</h2>;

const Products = () => {
  const productList = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Tablet" },
  ];
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {productList.map((p) => (
          <li key={p.id}>
            {/* relative link */}
            <Link to={`${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>Product Detail for ID: {id}</h3>
      <Link to="reviews">View Reviews</Link>
      <Outlet />
    </div>
  );
};

const ProductReviews = () => {
  const { id } = useParams();
  return <p>Reviews for product {id}</p>;
};

// ---------- Contact Page with Controlled Form ----------
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div>
      <h2>Contact Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} />
          {errors.message && <span style={{ color: "red" }}>{errors.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// ---------- Navigation ----------
const Navigation = React.memo(() => {
  return (
    <nav>
      {/* relative links inside Exp7 */}
      <Link to="">Welcome</Link> | <Link to="home">Home</Link> |{" "}
      <Link to="products">Products</Link> | <Link to="contact">Contact</Link>
    </nav>
  );
});

// ---------- Main Experiment Component ----------
const Exp7 = () => {
  return (
    <div>
      <h1>Experiment 7: SPA Routing & Forms</h1>
      <Navigation />
      <Routes>
        {/* index route shows welcome by default */}
        <Route index element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />}>
          <Route path="reviews" element={<ProductReviews />} />
        </Route>
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Exp7;