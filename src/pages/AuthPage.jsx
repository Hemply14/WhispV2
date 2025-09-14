import React, { useState, useEffect } from 'react';
import './AuthPage.css';
import { FaUserAstronaut, FaUserNinja, FaUserSecret, FaUserTie } from 'react-icons/fa';

const avatars = [<FaUserAstronaut />, <FaUserNinja />, <FaUserSecret />, <FaUserTie />];

const AuthPage = ({ onLogin }) => {
  // 'signup' if no pattern is stored, 'login' otherwise
  const [mode, setMode] = useState('login'); 
  const [pattern, setPattern] = useState([]);
  const [error, setError] = useState('');

  // Check for a saved pattern when the component loads
  useEffect(() => {
    const savedPattern = localStorage.getItem('whispUserPattern');
    if (!savedPattern) {
      setMode('signup');
    }
  }, []);

  const handlePatternClick = (index) => {
    setError(''); // Clear error on new input
    if (!pattern.includes(index)) {
      setPattern([...pattern, index]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'signup') {
      // --- SIGNUP LOGIC ---
      if (pattern.length < 3) {
        setError('Pattern must be at least 3 dots long.');
        return;
      }
      localStorage.setItem('whispUserPattern', JSON.stringify(pattern));
      alert('Your new pattern has been saved! Please enter it again to log in.');
      setMode('login');
      setPattern([]);
    } else {
      // --- LOGIN LOGIC ---
      const savedPattern = localStorage.getItem('whispUserPattern');
      if (JSON.stringify(pattern) === savedPattern) {
        // Correct pattern
        onLogin();
      } else {
        // Incorrect pattern
        setError('Incorrect pattern. Please try again.');
        setPattern([]);
      }
    }
  };
  
  // Helper function for testing to reset the stored pattern
  const resetApp = () => {
      if (window.confirm("Are you sure you want to reset your pattern? You will need to create a new one.")) {
          localStorage.removeItem('whispUserPattern');
          setMode('signup');
          setPattern([]);
          setError('');
      }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{mode === 'signup' ? 'Create Your Pattern' : 'Welcome Back'}</h2>
        <p>{mode === 'signup' ? 'Click at least 3 dots in order to create your secret login pattern.' : 'Please enter your visual pattern to log in.'}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="pattern-grid">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`pattern-dot ${pattern.includes(i) ? 'selected' : ''}`}
                onClick={() => handlePatternClick(i)}
              >
                {pattern.indexOf(i) > -1 ? pattern.indexOf(i) + 1 : ''}
              </div>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="pattern-actions">
            <button type="button" onClick={() => { setPattern([]); setError(''); }} className="btn btn-secondary">Clear</button>
            <button type="submit" className="btn">
              {mode === 'signup' ? 'Save Pattern' : 'Login'}
            </button>
          </div>
        </form>
         
         <div className="auth-footer">
            {mode === 'login' && <button onClick={resetApp} className="reset-link">Forgot pattern? Reset</button>}
         </div>
      </div>
    </div>
  );
};

export default AuthPage;