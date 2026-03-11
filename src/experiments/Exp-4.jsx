import React, { useState, useRef } from 'react';
import styles from './styles.module.css';

const ExperimentPage = () => {
  // Controlled Component State
  const [controlledValue, setControlledValue] = useState('');

  // Uncontrolled Component Ref
  const inputRef = useRef(null);

  const handleUncontrolledClick = () => {
    alert(`Uncontrolled Value: ${inputRef.current.value}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>React Components Experiment</h1>
        
        {/* Controlled Section */}
        <section className={styles.section}>
          <h3>Controlled Component</h3>
          <input 
            type="text" 
            value={controlledValue} 
            onChange={(e) => setControlledValue(e.target.value)} 
            placeholder="Type something..."
            className={styles.inputField}
          />
          <p>Current State: <strong>{controlledValue}</strong></p>
        </section>

        <hr className={styles.divider} />

        {/* Uncontrolled Section */}
        <section className={styles.section}>
          <h3>Uncontrolled Component</h3>
          <input 
            type="text" 
            ref={inputRef} 
            placeholder="Type and click button..."
            className={styles.inputField}
          />
          <button onClick={handleUncontrolledClick} className={styles.button}>
            Get Value via Ref
          </button>
        </section>
      </div>
    </div>
  );
};

export default ExperimentPage;