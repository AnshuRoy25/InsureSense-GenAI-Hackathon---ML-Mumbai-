import { useEffect } from 'react';
import './PlansSidebar.css';

function PlansSidebar({ show, plans, onClose }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  return (
    <>
      {show && <div className="overlay" onClick={onClose} />}
      
      <aside className={`plans-sidebar ${show ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>The Best Insurance Plans for you.</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="plans-content">
          {plans.length === 0 ? (
            <div className="no-plans">
              <p>No Insurance plans yet recommended.</p>
              <p className="no-plans-hint">Complete the questions to see personalized recommendations</p>
            </div>
          ) : (
            <div className="plans-list">
              {plans.map((plan, index) => (
                <PlanCard key={index} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function PlanCard({ plan }) {
  return (
    <div className="plan-card">
      <div className="plan-header">
        <h3 className="plan-name">{plan.name}</h3>
        <div className="plan-provider">{plan.provider}</div>
      </div>

      <div className="plan-price">
        <span className="price-amount">₹{plan.premium}</span>
        <span className="price-period">/month</span>
      </div>

      <div className="plan-coverage">
        <div className="coverage-item">
          <span className="coverage-label">Coverage</span>
          <span className="coverage-value">₹{plan.coverage}</span>
        </div>
      </div>

      <ul className="plan-features">
        {plan.features?.map((feature, i) => (
          <li key={i} className="feature-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button className="view-plan-button">View Details</button>
    </div>
  );
}

export default PlansSidebar;