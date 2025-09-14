import React, { useState } from 'react';
import './GuardianPage.css';
import { FaBell, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const initialApprovalItems = [
  { id: 1, content: 'My drawing of a space cat 🐱‍🚀' },
  { id: 2, content: 'My secret hideout plan' },
];

const GuardianPage = () => {
  const [approvalQueue, setApprovalQueue] = useState(initialApprovalItems);

  const handleApproval = (id, action) => {
    alert(`Journal entry ${id} ${action}!`);
    setApprovalQueue(prevQueue => prevQueue.filter(item => item.id !== id));
  };
  
  const handleViewSos = () => {
    alert('Viewing flagged journal entry:\n\n"I feel really sad and alone today..."\n\nIn a real app, this would open the full journal entry with support resources.');
  };

  return (
    <div className="guardian-page container">
      <h1 className="page-title">Guardian Dashboard</h1>
      <div className="guardian-grid">
        <div className="guardian-card sos-flags">
          <h3><FaBell /> SOS Flags</h3>
          <p>1 new journal flagged for expressing distress.</p>
          <div className="flagged-item">
            "I feel really sad and alone today..." 
            <button className="view-sos-btn" onClick={handleViewSos}>View</button>
          </div>
        </div>
        
        {/* ... The rest of the component remains the same ... */}
        <div className="guardian-card time-limits">
          <h3><FaClock /> App Access Time</h3>
          <p>Set a daily time limit for your child.</p>
          <div className="time-input">
            <input type="number" defaultValue="90" />
            <span>minutes per day</span>
          </div>
          <button className="btn" onClick={() => alert('Time limit saved!')}>Set Limit</button>
        </div>

        <div className="guardian-card journal-approval">
          <h3>Journal Approval Queue</h3>
          {approvalQueue.length > 0 ? (
            approvalQueue.map(item => (
              <div className="approval-item" key={item.id}>
                <div className="item-content"><strong>Entry:</strong> "{item.content}"</div>
                <div className="item-actions">
                  <button className="approve-btn" onClick={() => handleApproval(item.id, 'Approved')}><FaCheckCircle /> Approve</button>
                  <button className="reject-btn" onClick={() => handleApproval(item.id, 'Rejected')}><FaTimesCircle /> Reject</button>
                </div>
              </div>
            ))
          ) : (
            <p className="queue-empty">The approval queue is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuardianPage;