import React from 'react';
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#282c34',
    color: 'white',
  },
  hero: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
    padding: '0 20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#ff4757',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    marginTop: '20px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '50px 5%',
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
  }
};

function Home() {
  return (
    <>
      <nav style={styles.navbar}>
        <h2>BrandName</h2>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <header style={styles.hero}>
        <h1>Welcome to Our Modern React Site</h1>
        <p>Fast, responsive, and easy to customize.</p>

        <Link to="/aptitude">
          <button style={styles.button}>Start Aptitude Test</button>
        </Link>

        <Link to="/editor">
          <button style={{ ...styles.button, backgroundColor: "#2ed573" }}>
            Start Coding Test
          </button>
        </Link>
      </header>

      <section style={styles.features}>
        <div style={styles.card}>
          <h3>Fast Performance</h3>
          <p>Optimized for speed using React's virtual DOM.</p>
        </div>

        <div style={styles.card}>
          <h3>Responsive Design</h3>
          <p>Looks great on desktops, tablets, and phones.</p>
        </div>

        <div style={styles.card}>
          <h3>Component Based</h3>
          <p>Build encapsulated components that manage their own state.</p>
        </div>
      </section>
    </>
  );
}

export default Home;