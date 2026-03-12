import { useState } from "react";

function Exp10() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // Environment Variable Example
  const apiUrl = import.meta.env.VITE_API_URL || "Not Configured";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h1>Experiment 10</h1>
      <h2>Packaging and Deployment of SPA with Forms</h2>

      <hr />

      <h3>Environment Variable</h3>
      <p>
        API URL from <b>.env</b> file:
      </p>
      <code>{apiUrl}</code>

      <hr />

      <h3>Production Build Process</h3>
      <ul>
        <li>Building using Vite</li>
      </ul>

      <hr />

      <h3>Deployment Platforms</h3>
      <ul>
        <li>Netlify</li>
      </ul>

      <hr />

      <h3>Sample Form (Controlled Component)</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p style={{ color: "green" }}>
          Form submitted successfully!
        </p>
      )}

      <hr />

      <h3>Engineering Best Practices</h3>
      <ul>
        <li>Use environment variables</li>
        <li>Run linting before deployment</li>
        <li>Optimize assets</li>
        <li>Monitor errors after deployment</li>
      </ul>
    </div>
  );
}

export default Exp10;