import React, { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CreateJournalPage from './pages/CreateJournalPage';
import SettingsPage from './pages/SettingsPage';
import GuardianPage from './pages/GuardianPage';
import './App.css';

function App() {
  // STEP 1: When the app first loads, check localStorage for a saved login state.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Global style states
  const [focusMode, setFocusMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [textSpacing, setTextSpacing] = useState(0.05);

  // STEP 2: Use useEffect to automatically update localStorage whenever the login state changes.
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const globalStyles = {
    fontSize: `${fontSize}px`,
    letterSpacing: `${textSpacing}rem`,
  };

  return (
    <Router>
      <div 
        className={`page-container ${focusMode ? 'animations-disabled' : ''}`}
        style={globalStyles}
      >
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <main className="content-wrap">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create" element={<CreateJournalPage />} />
                <Route 
                  path="/settings" 
                  element={<SettingsPage 
                    focusMode={focusMode} setFocusMode={setFocusMode}
                    fontSize={fontSize} setFontSize={(val) => setFontSize(Number(val))}
                    textSpacing={textSpacing} setTextSpacing={(val) => setTextSpacing(parseFloat(val))}
                  />} 
                />
                <Route path="/guardian" element={<GuardianPage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;