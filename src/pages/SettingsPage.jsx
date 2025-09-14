import React, { useState, useRef } from 'react';
import './SettingsPage.css';
import { FaInfoCircle } from 'react-icons/fa';

const SettingsPage = ({ 
  focusMode, setFocusMode, 
  fontSize, setFontSize,
  textSpacing, setTextSpacing
}) => {
  const [narrationSpeed, setNarrationSpeed] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeout = useRef(null);

  const handleAssistiveClick = (e, actionText) => {
    e.preventDefault();
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(actionText);
    
    if (clickCount === 0) {
      speechSynthesis.speak(utterance);
      setClickCount(1);
      clickTimeout.current = setTimeout(() => setClickCount(0), 2500);
    } else {
      clearTimeout(clickTimeout.current);
      setClickCount(0);
      alert(`Action "${actionText}" confirmed! Settings saved (mock).`);
    }
  };

  return (
    <div className="settings-page container">
      <h1 className="page-title">Settings</h1>
      
      <div className="settings-section">
        <h3><FaInfoCircle /> Double-Tap Assistive Interaction Demo</h3>
        <p>This is an accessibility feature. Tap once to hear the action, tap again to confirm.</p>
        <button 
          className="btn" 
          onClick={(e) => handleAssistiveClick(e, 'Save all settings')} 
          aria-label="Save all settings"
        >
          {clickCount > 0 ? 'Tap again to confirm!' : 'Save Settings (Test Button)'}
        </button>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Display</h3>
          <div className="setting-item">
            <label htmlFor="theme">Color Theme</label>
            <select id="theme"><option>Pastel</option><option>Dark</option><option>High Contrast</option></select>
          </div>
          <div className="setting-item">
            <label htmlFor="fontSize">Font Size ({fontSize}px)</label>
            {/* FIX: Convert value to a number */}
            <input type="range" id="fontSize" min="16" max="24" step="1" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
          </div>
           <div className="setting-item">
            <label htmlFor="textSpacing">Text Spacing ({textSpacing.toFixed(2)}rem)</label>
            {/* FIX: Convert value to a floating point number */}
            <input type="range" id="textSpacing" min="0.05" max="0.2" step="0.01" value={textSpacing} onChange={(e) => setTextSpacing(parseFloat(e.target.value))} />
          </div>
        </div>

        <div className="settings-card">
          <h3>Accessibility</h3>
           <div className="setting-item toggle">
            <label htmlFor="focusMode">Focus Mode (No Animations)</label>
            <input type="checkbox" id="focusMode" checked={focusMode} onChange={(e) => setFocusMode(e.target.checked)} />
          </div>
          <div className="setting-item toggle">
            <label htmlFor="readingRuler">Reading Ruler</label>
            <input type="checkbox" id="readingRuler" />
          </div>
        </div>

        <div className="settings-card">
          <h3>Audio</h3>
          <div className="setting-item">
            <label htmlFor="narrationSpeed">Narration Speed ({narrationSpeed}x)</label>
            <input type="range" id="narrationSpeed" min="0.5" max="2" step="0.1" value={narrationSpeed} onChange={(e) => setNarrationSpeed(parseFloat(e.target.value))} />
          </div>
          <div className="setting-item toggle">
            <label htmlFor="hintNarration">Hint Narration</label>
            <input type="checkbox" id="hintNarration" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;