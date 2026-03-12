import React, { createContext, useState, useContext, useRef } from 'react';

// ==========================================
// 1. Create Contexts
// ==========================================
const ThemeContext = createContext();
const AuthContext = createContext();

// ==========================================
// 2. Create Providers
// ==========================================
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Centering Wrapper */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: theme === 'light' ? '#f4f4f4' : '#1a1a1a',
        padding: '20px'
      }}>
        {/* Main Content Card */}
        <div style={{ 
          width: '100%',
          maxWidth: '800px',
          backgroundColor: theme === 'light' ? '#ffffff' : '#222222', 
          color: theme === 'light' ? '#000000' : '#ffffff',
          fontFamily: 'sans-serif',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// 3. Components
// ==========================================
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <nav style={{ 
      padding: '1.5rem', 
      borderBottom: `1px solid ${theme === 'light' ? '#eee' : '#333'}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>App (Renders: {renderCount.current})</h3>
      <div>
        {user ? (
          <button onClick={logout} style={{ marginRight: '10px' }}>Logout {user.name}</button>
        ) : (
          <span style={{ marginRight: '10px' }}>Guest</span>
        )}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </nav>
  );
};

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Dashboard (Renders: {renderCount.current})</h2>
      {!user ? (
        <button onClick={() => login('ReactPro2026')}>Log In</button>
      ) : (
        <p>Welcome back, <strong>{user.name}</strong>!</p>
      )}
    </div>
  );
};

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <footer style={{ 
      padding: '1rem', 
      backgroundColor: theme === 'light' ? '#f9f9f9' : '#333',
      textAlign: 'center',
      fontSize: '0.8rem'
    }}>
      Footer Renders: {renderCount.current}
    </footer>
  );
};

// ==========================================
// 4. Main App
// ==========================================
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <UserProfile />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}