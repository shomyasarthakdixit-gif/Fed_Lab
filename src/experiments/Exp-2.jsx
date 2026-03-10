import React from 'react';

const UserService = {
  fetchUsers: () => [
    { id: 1, name: "Satyam Kumar kapri", role: "Frontend Developer" },
    { id: 2, name: "Tanmay Saini", role: "UI/UX Designer" },
    { id: 3, name: "Krishna Naria", role: "DevOps Engineer" }
  ]
};

const Header = ({ title, count }) => (
  <header style={styles.header}>
    <h1 style={styles.titleText}>{title}</h1>
    <p style={styles.subtitleText}>Currently managing {count} active profiles</p>
    <div style={styles.divider}></div>
  </header>
);

const UserCard = ({ user }) => {
  const { name, role } = user; 
  
  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <h3 style={styles.userName}>{name}</h3>
        <p style={styles.userRole}>{role}</p>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const users = UserService.fetchUsers();

  return (
    <div style={styles.screenWrapper}>
      <div style={styles.dashboardContainer}>
        <Header title="User Information Dashboard" count={users.length} />
        
        <div style={styles.grid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  screenWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f8f9fa', 
    margin: 0,
    padding: 0,
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  dashboardContainer: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    maxWidth: '850px',
    width: '90%',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'left'
  },
  titleText: {
    margin: 0,
    color: '#2d3436', 
    fontSize: '2.2rem',
    letterSpacing: '-0.5px'
  },
  subtitleText: {
    color: '#636e72',
    marginTop: '8px',
    fontSize: '1rem'
  },
  divider: {
    height: '3px',
    backgroundColor: '#2d3436',
    marginTop: '15px',
    width: '100px' 
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    flex: '1 1 240px',
    minHeight: '120px',
    border: '1px solid #dfe6e9',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center', 
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'default'
  },
  userName: {
    margin: '0 0 4px 0',
    color: '#2d3436',
    fontSize: '1.25rem'
  },
  userRole: {
    margin: 0,
    color: '#0984e3', 
    fontSize: '0.95rem',
    fontWeight: '500'
  }
};

export default UserDashboard;