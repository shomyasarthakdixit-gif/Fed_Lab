import React, { useState } from 'react';

export default function App() {
  const [view, setView] = useState('signup'); // 'signup' or 'login'
  const [userData, setUserData] = useState({ email: '', password: '' });

  return (
    <div className="auth-wrapper">
<style>{`
  body, html, #root { margin: 0; padding: 0; height: 100%; width: 100%; }

  .auth-wrapper {
    display: flex;          /* Enables Flexbox */
    justify-content: center; /* Centers horizontally */
    align-items: center;     /* Centers vertically */
    min-height: 100vh;       /* Full screen height */
    width: 100vw;            /* Full screen width */
    background-color: #1a1a1a; /* Matches your dark background */
  }

  .master-div {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 350px;
    text-align: center;
    color: #333; /* Ensures text is dark */
  }

  .auth-form input {
    display: block;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #000; /* Dark text in input */
  }

  .auth-form button {
    width: 95%;
    padding: 10px;
    background-color: #007bff;
    color: white; /* White text on blue button */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
  }
`}</style>

      <div className="master-div">
        {view === 'signup' ? (
          <SignUp 
            onSuccess={(data) => { setUserData(data); setView('login'); }} 
            switchToLogin={() => setView('login')} 
          />
        ) : (
          <Login 
            storedData={userData} 
            switchToSignup={() => setView('signup')} 
          />
        )}
      </div>
    </div>
  );
}

function SignUp({ onSuccess, switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) setMsg("Passwords do not match.");
    else if (password.length < 6) setMsg("Password must be 6+ chars.");
    else {
      setMsg("Signup successful! Redirecting...");
      setTimeout(() => onSuccess({ email, password }), 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Create Account</h3>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} required />
      <button type="submit">Sign Up</button>
      <p>{msg}</p>
      <button type="button" onClick={switchToLogin} style={{background:'#6c757d'}}>Already have an account? Login</button>
    </form>
  );
}

function Login({ storedData, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === storedData.email && password === storedData.password) {
      setMsg("Login Successful!");
    } else {
      setMsg("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h3>Login</h3>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" style={{background:'#007bff'}}>Login</button>
      <p>{msg}</p>
      <button type="button" onClick={switchToSignup} style={{background:'#6c757d'}}>Need an account? Sign Up</button>
    </form>
  );
}