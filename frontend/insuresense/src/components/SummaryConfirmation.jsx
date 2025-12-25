import './SummaryConfirmation.css';

function SummaryConfirmation({ summary, onConfirm, showPlansButton, onPlansClick }) {
  return (
    <div className="summary-confirmation">
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

      <div className="summary-container fade-in">
        <h2 className="summary-title">Here's what we've understood about your situation</h2>
        
        <div className="summary-box">
          <p className="summary-text">{summary}</p>
        </div>

        <div className="confirmation-question">
          <p>Does this summary look accurate, or would you like to correct anything before I analyse the risks and suggest whether insurance makes sense for you?</p>
        </div>

        <div className="action-buttons">
          <button 
            className="confirm-button"
            onClick={() => onConfirm(true)}
          >
            Yes, that's accurate
          </button>
          <button 
            className="edit-button"
            onClick={() => onConfirm(false)}
          >
            I'd like to change some details
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryConfirmation;