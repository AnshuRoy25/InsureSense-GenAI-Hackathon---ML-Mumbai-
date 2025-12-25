import './LandingScreen.css';
import { MdFlight, MdLocalHospital, MdDirectionsCar, MdHome, MdFavorite, MdMoreHoriz } from 'react-icons/md';

function LandingScreen({ onStart, animating }) {
  return (
    <div className={`landing-screen ${animating ? 'slide-up' : ''}`}>
      <div className="landing-content">
        <div className="logo-container">
          <svg className="logo-icon" width="64" height="64" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="#d32f2f" strokeWidth="3"/>
            <path 
              d="M40 25C40 25 30 30 30 40C30 50 40 55 40 55C40 55 50 50 50 40C50 30 40 25 40 25Z" 
              fill="#d32f2f"
            />
          </svg>
          <h1 className="brand-name">InsureSense</h1>
          <p className="brand-tagline">AI which decides when to insure, not just what to insure.</p>
        </div>

        <div className="options-grid fade-in">
          <OptionCard 
            Icon={MdFlight}
            title="Travel Insurance"
            description="Planning a trip and want travel advice or insurance"
            onClick={() => onStart('travel')}
          />
          <OptionCard 
            Icon={MdLocalHospital}
            title="Health Insurance"
            description="Need help with health insurance or medical coverage"
            onClick={() => onStart('health')}
          />
          <OptionCard 
            Icon={MdDirectionsCar}
            title="Car Insurance"
            description="Looking into car insurance or vehicle protection"
            onClick={() => onStart('car')}
          />
          <OptionCard 
            Icon={MdHome}
            title="Home Insurance"
            description="Want to protect my home or renters insurance"
            onClick={() => onStart('home')}
          />
          <OptionCard 
            Icon={MdFavorite}
            title="Life Insurance"
            description="Exploring life insurance or family protection plans"
            onClick={() => onStart('life')}
          />
          <OptionCard 
            Icon={MdMoreHoriz}
            title="Other"
            description="Policy renewal, claims, general questions"
            onClick={() => onStart('general')}
          />
        </div>
      </div>
    </div>
  );
}

function OptionCard({ Icon, title, description, onClick }) {
  return (
    <button className="option-card" onClick={onClick}>
      <div className="option-icon">
        <Icon />
      </div>
      <h3 className="option-title">{title}</h3>
      <p className="option-description">{description}</p>
    </button>
  );
}

export default LandingScreen;