import { useState } from 'react';
import './ReportView.css';

function ReportView({ showPlansButton, onPlansClick }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  // Hardcoded report data
  const report = {
    overallRiskScore: 7.8,
    generationDate: "December 25, 2024, 2:30 PM IST",
    insuranceType: "Travel Insurance",
    profileOverview: {
      route: "Delhi (DEL) to Mumbai (BOM)",
      airline: "IndiGo Flight 6E-2045",
      departureDate: "January 15, 2025",
      tripDuration: "4 days",
      travelers: "1 Adult",
      purpose: "Business Travel"
    },
    topCriticalRisks: [
      {
        risk: "Flight Cancellation/Delay",
        probability: "High (35%)",
        impact: "₹45,000 - ₹85,000"
      },
      {
        risk: "Severe Weather Disruption",
        probability: "Medium-High (28%)",
        impact: "₹30,000 - ₹60,000"
      },
      {
        risk: "Medical Emergency",
        probability: "Low-Medium (12%)",
        impact: "₹50,000 - ₹2,00,000"
      }
    ],
    totalFinancialExposure: "₹1,25,000 - ₹3,45,000",
    worstCaseExposure: "₹3,45,000",
    expectedLoss: "₹28,500",
    detailedRiskAnalysis: {
      flightDisruption: {
        severity: "Critical",
        description: "IndiGo has experienced significant operational challenges in recent months. In the past 3 months alone, over 1,200 flights have been cancelled or delayed by more than 3 hours on the Delhi-Mumbai route. December 2024 saw a 42% increase in cancellations due to fog in Delhi and technical issues.",
        specificConcerns: [
          "Dense fog conditions in Delhi (Jan-Feb) causing average delays of 2-4 hours",
          "IndiGo's recent fleet maintenance issues affecting 15% of aircraft",
          "Mumbai airport congestion during peak business hours (6-9 AM, 5-8 PM)",
          "Your flight time (7:30 AM) falls in peak fog period"
        ],
        financialImpact: "Rebooking costs: ₹12,000-25,000, Hotel stay: ₹8,000-15,000, Missed business opportunity: ₹25,000-45,000"
      },
      weatherRisks: {
        severity: "High",
        description: "Mumbai is experiencing unusual weather patterns this winter season. The monsoon withdrawal has been delayed, and cyclonic formations in the Arabian Sea are causing unpredictable weather.",
        specificConcerns: [
          "IMD predicts 60% chance of heavy rainfall in Mumbai during Jan 10-20",
          "Cyclone warning issued for Arabian Sea - may intensify Jan 12-16",
          "Historical data shows 18% of flights get diverted during such conditions",
          "Mumbai's drainage issues cause city-wide disruptions even with moderate rain"
        ],
        financialImpact: "Flight diversion costs: ₹15,000-30,000, Extended stay: ₹10,000-20,000, Ground transportation delays: ₹5,000-10,000"
      },
      medicalEmergency: {
        severity: "Medium",
        description: "While probability is lower, medical emergencies during travel can result in catastrophic costs, especially if hospitalization is required.",
        specificConcerns: [
          "COVID-19 variants still circulating - testing required if symptoms develop",
          "Food poisoning risks at airports and during travel",
          "Pre-existing conditions may worsen during air travel",
          "Mumbai's top hospitals charge ₹50,000-2,00,000 for emergency care"
        ],
        financialImpact: "Emergency medical: ₹50,000-2,00,000, Trip cancellation: ₹20,000-40,000, Medical evacuation: ₹1,00,000+"
      },
      baggageLoss: {
        severity: "Low-Medium",
        description: "IndiGo's baggage handling has improved but still reports 8 cases of mishandled baggage per 1,000 passengers.",
        specificConcerns: [
          "Delhi airport undergoing terminal renovations causing routing confusion",
          "Business travel items (laptops, documents) are high-value",
          "Average resolution time: 24-48 hours"
        ],
        financialImpact: "Replacement essentials: ₹8,000-15,000, Business equipment: ₹40,000-80,000"
      }
    },
    evidenceSources: [
      "IndiGo Flight Performance Data (Oct-Dec 2024) - DGCA Reports",
      "India Meteorological Department (IMD) Weather Forecasts",
      "Mumbai Airport Authority Operational Statistics",
      "Ministry of Civil Aviation Consumer Complaints Database",
      "Historical flight cancellation data for DEL-BOM route",
      "Arabian Sea Cyclone Tracking System - IMD",
      "Mumbai Municipal Corporation Monsoon Preparedness Report"
    ],
    specificScenarios: [
      {
        scenario: "Complete Trip Cancellation",
        probability: "18%",
        description: "Dense fog in Delhi prevents takeoff for 12+ hours, forcing you to cancel the entire trip",
        cost: "₹65,000 (Flight rebooking ₹15,000 + Lost business opportunity ₹50,000)"
      },
      {
        scenario: "Flight Diversion to Pune",
        probability: "15%",
        description: "Heavy rain in Mumbai causes flight diversion to Pune, requiring ground transport",
        cost: "₹28,000 (Transport ₹8,000 + Extra day stay ₹12,000 + Meals ₹3,000 + Business delay ₹5,000)"
      },
      {
        scenario: "24-Hour Delay",
        probability: "22%",
        description: "Technical issues with aircraft grounding it for maintenance",
        cost: "₹35,000 (Hotel ₹10,000 + Meals ₹5,000 + Missed meetings ₹20,000)"
      },
      {
        scenario: "Medical Emergency in Flight",
        probability: "3%",
        description: "In-flight medical issue requiring emergency landing and hospitalization",
        cost: "₹1,85,000 (Emergency care ₹1,20,000 + Hospital stay ₹45,000 + Trip cancellation ₹20,000)"
      },
      {
        scenario: "Baggage Loss with Laptop",
        probability: "8%",
        description: "Checked baggage containing business laptop and documents goes missing",
        cost: "₹72,000 (Laptop replacement ₹60,000 + Essentials ₹8,000 + Document recreation ₹4,000)"
      }
    ],
    keyRecommendation: {
      verdict: "STRONGLY RECOMMENDED",
      reasoning: "Given the high probability (35%) of flight disruption on the Delhi-Mumbai IndiGo route during winter months, combined with current weather warnings and the airline's recent operational challenges, travel insurance is strongly recommended. The expected loss of ₹28,500 far exceeds typical premium costs of ₹800-1,500, providing a favorable risk-reward ratio of 19:1.",
      urgency: "Critical - Book within 24 hours of trip booking for maximum coverage"
    },
    optimalCoverage: {
      recommendedAmount: "₹3,00,000",
      breakdown: {
        tripCancellation: "₹75,000",
        flightDelay: "₹25,000 (₹5,000 per 6-hour delay)",
        medicalEmergency: "₹1,50,000",
        baggageLoss: "₹40,000",
        personalAccident: "₹10,00,000 (Death/Disability)"
      },
      estimatedPremium: "₹1,200 - ₹1,800",
      insuranceProviders: [
        "ICICI Lombard Travel Insurance - ₹1,250",
        "HDFC ERGO Trip Protector - ₹1,450",
        "Bajaj Allianz Travel Guard - ₹1,180"
      ]
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || isChatting) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsChatting(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'coverage': 'Based on your Delhi-Mumbai flight, I recommend ₹3,00,000 comprehensive coverage including trip cancellation (₹75,000), medical emergency (₹1,50,000), and baggage loss (₹40,000). This protects you against the high risk of IndiGo flight disruptions during fog season.',
        'cost': 'The premium for comprehensive travel insurance ranges from ₹1,180 to ₹1,800 depending on the provider. Given your total financial exposure of ₹3,45,000, this represents just 0.4-0.5% of your risk - an excellent value proposition.',
        'indigo': 'IndiGo has cancelled over 1,200 flights on the Delhi-Mumbai route in the past 3 months. Your 7:30 AM departure time falls during peak fog hours in Delhi (Jan-Feb), when delays of 2-4 hours are common. Additionally, their recent fleet maintenance issues affect 15% of aircraft.',
        'weather': 'Mumbai is under cyclone watch with IMD predicting 60% chance of heavy rainfall during January 10-20. The monsoon withdrawal has been delayed, and cyclonic formations in the Arabian Sea may intensify January 12-16. Historical data shows 18% of flights get diverted during such conditions.',
        'default': 'I can help you understand your travel insurance report. You can ask me about specific risks, coverage recommendations, IndiGo flight issues, Mumbai weather concerns, or the financial impact of different scenarios.'
      };

      let response = responses.default;
      const input = chatInput.toLowerCase();
      
      if (input.includes('coverage') || input.includes('recommend')) {
        response = responses.coverage;
      } else if (input.includes('cost') || input.includes('premium') || input.includes('price')) {
        response = responses.cost;
      } else if (input.includes('indigo') || input.includes('flight') || input.includes('cancel')) {
        response = responses.indigo;
      } else if (input.includes('weather') || input.includes('rain') || input.includes('cyclone') || input.includes('mumbai')) {
        response = responses.weather;
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsChatting(false);
    }, 1500);
  };

  return (
    <div className="report-view">
      {showPlansButton && (
        <button className="plans-button" onClick={onPlansClick}>
          Plans
        </button>
      )}

      <div className="report-header">
        <div className="logo-mini">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#d32f2f" strokeWidth="2"/>
            <path d="M16 10C16 10 12 12 12 16C12 20 16 22 16 22C16 22 20 20 20 16C20 12 16 10 16 10Z" fill="#d32f2f"/>
          </svg>
          <span>InsureSense</span>
        </div>
      </div>

      <div className="report-container fade-in">
        <h2 className="report-title">Your Personalized Insurance Report</h2>
        <p className="insurance-type">{report.insuranceType}</p>

        <div className="report-content">
          {/* Overall Risk Score */}
          <div className="risk-score-card">
            <h3>Overall Risk Score</h3>
            <div className="risk-score-value">
              {report.overallRiskScore}
              <span className="risk-score-max">/10</span>
            </div>
            <p className="risk-score-label">High Risk - Insurance Strongly Recommended</p>
          </div>

          {/* Generation Date */}
          <div className="generation-date">
            <strong>Report Generated:</strong> {report.generationDate}
          </div>

          {/* Profile Overview */}
          <div className="report-section">
            <h3>Profile Overview</h3>
            <div className="profile-grid">
              {Object.entries(report.profileOverview).map(([key, value]) => (
                <div key={key} className="profile-item">
                  <div className="profile-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="profile-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Critical Risks */}
          <div className="report-section">
            <h3>Top 3 Critical Risks</h3>
            {report.topCriticalRisks.map((risk, index) => (
              <div key={index} className="critical-risk-card">
                <h4>{index + 1}. {risk.risk}</h4>
                <div className="risk-details">
                  <span><strong>Probability:</strong> {risk.probability}</span>
                  <span><strong>Financial Impact:</strong> {risk.impact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Exposure */}
          <div className="report-section">
            <h3>Financial Exposure Analysis</h3>
            <div className="exposure-grid">
              <div className="exposure-card total">
                <div className="exposure-label">Total Exposure</div>
                <div className="exposure-value">{report.totalFinancialExposure}</div>
              </div>
              <div className="exposure-card worst">
                <div className="exposure-label">Worst-Case (Uninsured)</div>
                <div className="exposure-value">{report.worstCaseExposure}</div>
              </div>
              <div className="exposure-card expected">
                <div className="exposure-label">Expected Loss (Avg)</div>
                <div className="exposure-value">{report.expectedLoss}</div>
              </div>
            </div>
          </div>

          {/* Detailed Risk Analysis */}
          <div className="report-section">
            <h3>Detailed Risk Analysis by Category</h3>
            {Object.entries(report.detailedRiskAnalysis).map(([key, risk]) => (
              <div key={key} className="risk-analysis-card">
                <div className="risk-analysis-header">
                  <h4>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}</h4>
                  <span className={`severity-badge ${risk.severity.toLowerCase()}`}>
                    {risk.severity} Severity
                  </span>
                </div>
                <p className="risk-description">{risk.description}</p>
                
                <h5>Specific Concerns:</h5>
                <ul className="concerns-list">
                  {risk.specificConcerns.map((concern, idx) => (
                    <li key={idx}>{concern}</li>
                  ))}
                </ul>
                
                <div className="financial-impact">
                  <strong>Financial Impact:</strong>
                  <span>{risk.financialImpact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Evidence & Sources */}
          <div className="report-section">
            <h3>Evidence & Sources</h3>
            <div className="evidence-box">
              <ul>
                {report.evidenceSources.map((source, idx) => (
                  <li key={idx}>{source}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specific Scenarios */}
          <div className="report-section">
            <h3>Specific Scenarios You Might Face</h3>
            {report.specificScenarios.map((scenario, idx) => (
              <div key={idx} className="scenario-card">
                <div className="scenario-header">
                  <h4>{scenario.scenario}</h4>
                  <span className="probability-badge">{scenario.probability} chance</span>
                </div>
                <p>{scenario.description}</p>
                <div className="scenario-cost">
                  <strong>Potential Cost: {scenario.cost}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Key Recommendation */}
          <div className="recommendation-card">
            <h3>Key Recommendation: Should You Get Insurance?</h3>
            <div className="recommendation-verdict">{report.keyRecommendation.verdict}</div>
            <p className="recommendation-reasoning">{report.keyRecommendation.reasoning}</p>
            <div className="recommendation-urgency">
              <strong>⚡ {report.keyRecommendation.urgency}</strong>
            </div>
          </div>

          {/* Optimal Coverage */}
          <div className="report-section">
            <h3>Optimal Coverage Amount</h3>
            <div className="coverage-summary">
              <div className="coverage-label">Recommended Total Coverage</div>
              <div className="coverage-amount">{report.optimalCoverage.recommendedAmount}</div>
              <div className="coverage-premium">Estimated Premium: <strong>{report.optimalCoverage.estimatedPremium}</strong></div>
            </div>

            <h4>Coverage Breakdown:</h4>
            <div className="breakdown-list">
              {Object.entries(report.optimalCoverage.breakdown).map(([key, value]) => (
                <div key={key} className="breakdown-item">
                  <span>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <h4>Recommended Insurance Providers:</h4>
            <div className="providers-list">
              {report.optimalCoverage.insuranceProviders.map((provider, idx) => (
                <div key={idx} className="provider-item">{provider}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="chat-section">
          <h3 className="chat-title">Have questions about your report?</h3>
          
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="chat-placeholder">
                <p>Ask me anything about your insurance report...</p>
                <p className="chat-hint">Try: "Tell me about IndiGo flight issues" or "What's the weather risk?"</p>
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))
            )}
            {isChatting && (
              <div className="chat-message assistant">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about coverage, costs, or specific risks..."
              disabled={isChatting}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isChatting}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10L18 2L10 18L9 11L2 10Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportView;