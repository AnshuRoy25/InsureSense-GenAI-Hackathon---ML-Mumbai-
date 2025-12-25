import { useState } from 'react';
import './SummaryEdit.css';

function SummaryEdit({ currentSummary, onSubmit, showPlansButton, onPlansClick }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmit(feedback);
    }
  };

  return (
    <div className="summary-edit">
      {showPlansButton && (
        <button className="plans-button" onClick={onPlansClick}>
          Plans
        </button>
      )}

      <div className="summary-header">
        <div className="logo-mini">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#d32f2f" strokeWidth="2"/>
            <path d="M16 10C16 10 12 12 12 16C12 20 16 22 16 22C16 22 20 20 20 16C20 12 16 10 16 10Z" fill="#d32f2f"/>
          </svg>
          <span>InsureSense</span>
        </div>
      </div>

      <div className="summary-edit-container fade-in">
        <h2 className="edit-title">Your Previous Summary</h2>
        
        <div className="summary-box">
          <p className="summary-text">{currentSummary}</p>
        </div>

        <div className="feedback-section">
          <label className="feedback-label">
            What details would you like to change in the previous summary?
          </label>
          <textarea
            className="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please tell me what you'd like to correct or add..."
            rows={6}
            autoFocus
          />
        </div>

        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!feedback.trim()}
        >
          Update Summary
        </button>
      </div>
    </div>
  );
}

export default SummaryEdit;