import './LoadingReport.css';

function LoadingReport() {
  return (
    <div className="loading-report">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2 className="loading-title">Generating your personalized report...</h2>
        <p className="loading-subtitle">This may take a few moments</p>
      </div>
    </div>
  );
}

export default LoadingReport;