import React, { useState } from 'react';
import './DashboardPage.css';
import { FaSmile, FaMeh, FaSadTear, FaAngry, FaSurprise, FaPlus, FaBullhorn, FaStickyNote } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const moods = [{ icon: <FaSadTear />, label: 'Sad' }, { icon: <FaMeh />, label: 'Okay' }, { icon: <FaSmile />, label: 'Happy' }, { icon: <FaSurprise />, label: 'Excited' }, { icon: <FaAngry />, label: 'Angry' }];
const journalEntries = [
  { id: 1, type: 'drawing', user: 'Leo', content: '[Image of a friendly robot]', emoji: '🤖', world: 'our' },
  { id: 2, type: 'voice', user: 'You', content: 'Today I built the tallest block tower ever!', emoji: '🏆', world: 'my' },
  { id: 3, type: 'text', user: 'Maya', content: 'My dog learned a new trick! He can roll over.', emoji: '🐶', world: 'our' },
  { id: 4, type: 'text', user: 'You', content: 'Secret plan for treehouse is almost complete.', emoji: '🤫', world: 'my' },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('my');
  const [mood, setMood] = useState(null);

  const handleTextToSpeech = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="dashboard-page container">
      <div className="mood-tracker">
        <h2 className="mood-title">How are you feeling, Alex?</h2>
        <div className="mood-icons">
          {moods.map(m => (
            <button key={m.label} className={`mood-btn ${mood === m.label ? 'selected' : ''}`} onClick={() => setMood(m.label)} title={m.label}>
              {m.icon}<span>{m.label}</span>
            </button>
          ))}
        </div>
        {mood && <p className="mood-confirmation">Thanks for sharing that you're feeling {mood.toLowerCase()}!</p>}
      </div>

      <div className="journal-feed">
        <div className="feed-header">
            <div className="feed-tabs">
                <button onClick={() => setActiveTab('my')} className={activeTab === 'my' ? 'active' : ''}>My World</button>
                <button onClick={() => setActiveTab('our')} className={activeTab === 'our' ? 'active' : ''}>Our World</button>
            </div>
            <Link to="/create" className="btn new-journal-button-header"><FaPlus /> New Journal</Link>
        </div>

        <div className="entries-grid">
          {journalEntries.filter(j => j.world === activeTab).map(entry => (
            <div key={entry.id} className="journal-card">
              <div className="card-header">
                <span className="card-user">{entry.user}</span>
                <span className="card-emoji">{entry.emoji}</span>
              </div>
              <div className="card-content">
                {entry.type === 'drawing' && <div className="drawing-placeholder">{entry.content}</div>}
                {entry.type !== 'drawing' && <p>{entry.content}</p>}
              </div>
              <div className="card-footer">
                <button className="tts-btn" onClick={() => handleTextToSpeech(entry.content)}>Read Aloud</button>
                {activeTab === 'our' && (
                  <div className="peer-echoes">
                    <span>Send Echo:</span>
                    <button title="Record Voice Reply"><FaBullhorn /></button>
                    <button title="Send Sticker Reply"><FaStickyNote /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;