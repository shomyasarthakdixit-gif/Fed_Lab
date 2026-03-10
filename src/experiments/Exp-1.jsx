import React, { useState } from 'react';

const StatusPanel = ({ status, onToggle, isDark }) => {
  const statusColor = status === 'Active' ? '#4caf50' : '#f44336';
  
  return (
    <div style={{ 
      padding: '20px', 
      border: `1px solid ${isDark ? '#444' : '#ddd'}`, 
      borderRadius: '12px',
      backgroundColor: isDark ? '#2c2c2c' : '#fafafa',
      marginTop: '20px'
    }}>
      <p style={{ color: isDark ? '#ddd' : '#333', fontSize: '1rem' }}>
        Current Status: <strong style={{ color: statusColor }}>{status}</strong>
      </p>
      
      <button 
        onClick={onToggle}
        style={{ 
          padding: '10px 20px', 
          cursor: 'pointer', 
          borderRadius: '6px', 
          border: 'none', 
          backgroundColor: '#007bff', 
          color: 'white',
          fontWeight: '600',
          transition: 'transform 0.1s active'
        }}
      >
        Toggle Status
      </button>
    </div>
  );
};

const ProfileCard = ({ name, role, isDark }) => (
  <div>
    <h2 style={{ margin: '0 0 8px 0', color: isDark ? '#fff' : '#222', fontSize: '1.8rem' }}>{name}</h2>
    <p style={{ color: isDark ? '#aaa' : '#666', fontSize: '1.1rem', margin: 0 }}>{role}</p>
  </div>
);


export default function ProfileDashboard() {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState({
    name: "Shomya Sarthak Dixit",
    role: "Senior Lead Frontend Developer",
    status: "Active"
  });

  const toggleStatus = () => {
    setUser(prevUser => ({
      ...prevUser, 
      status: prevUser.status === 'Active' ? 'Away' : 'Active' 
    }));
  };

  const pageWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    margin: 0,
    backgroundColor: isDark ? '#121212' : '#f8f9fa',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    transition: 'background-color 0.4s ease'
  };

  const cardStyle = {
    maxWidth: '380px',
    width: '90%',
    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
    padding: '40px',
    boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.1)',
    borderRadius: '24px',
    textAlign: 'center',
    position: 'relative'
  };

  return (
    <div style={pageWrapperStyle}>
      <style>{`body { margin: 0; overflow: hidden; }`}</style>
      
      <div style={cardStyle}>
        <button 
          onClick={() => setIsDark(!isDark)} 
          style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem' 
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <ProfileCard name={user.name} role={user.role} isDark={isDark} />
        <StatusPanel status={user.status} onToggle={toggleStatus} isDark={isDark} />
        
        <footer style={{ marginTop: '30px', fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
          Note: The UI updates automatically via Virtual DOM reconciliation.
        </footer>
      </div>
    </div>
  );
}