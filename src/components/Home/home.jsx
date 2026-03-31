import React from 'react';
import { useNavigate } from "react-router-dom";

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


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav style={styles.navbar}>
        <h2>Assessment Portal</h2>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li>Home</li>
          <li>Tests</li>
          <li>Contact</li>
        </ul>
      </nav>

      <header style={styles.hero}>
        <h1>Welcome to Dashboard</h1>
        <p>Select your test and start practicing</p>

        <button style={styles.button} onClick={() => navigate("/coding")}>
          Start Coding Test
        </button>
      </header>

      <section style={styles.features}>
        <div style={styles.card}>

          <h3>Coding Test</h3>
          <p>Practice programming MCQs</p>
        </div>
        <div style={styles.card}>
          <h3>Aptitude Test</h3>
          <p>Improve logical thinking</p>
        </div>
        <div style={styles.card}>
          <h3>English Test</h3>
          <p>Enhance communication skills</p>
        </div>
      </section>
    </>
  );

};
export default Home;