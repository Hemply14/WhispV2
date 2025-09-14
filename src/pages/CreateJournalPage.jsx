import React, { useState, useEffect } from 'react';
import './CreateJournalPage.css';
import { FaMicrophone, FaStop, FaPaintBrush, FaSave } from 'react-icons/fa';

// Browser Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = true;
  recognition.lang = 'en-US';
}

const CreateJournalPage = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setText(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      if(recognition) {
        recognition.start();
        setIsListening(true);
      } else {
        alert("Sorry, your browser doesn't support speech recognition.")
      }
    }
  };

  return (
    <div className="create-journal-page container">
      <h1 className="page-title">New Journal Entry</h1>
      <div className="daily-prompt">
        <strong>Today's Prompt:</strong> What is something that made you smile today?
      </div>
      <div className="creation-center">
        <textarea 
          className="text-editor" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Start writing or use the microphone..."
        />
        <div className="tool-buttons">
          <button onClick={toggleListen} className={`mic-btn ${isListening ? 'listening' : ''}`}>
            {isListening ? <><FaStop /> Stop</> : <><FaMicrophone /> Record</>}
          </button>
          <button className="draw-btn"><FaPaintBrush /> Draw</button>
        </div>
        <div className="drawing-canvas-placeholder">
            <p>Your drawing will appear here!</p>
        </div>
        <button className="btn save-btn"><FaSave /> Save Journal</button>
      </div>
    </div>
  );
};

export default CreateJournalPage;