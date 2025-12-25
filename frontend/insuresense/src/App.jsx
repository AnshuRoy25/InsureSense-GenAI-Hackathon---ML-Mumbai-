import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import PlansSidebar from './components/PlansSidebar';
import LandingScreen from './components/LandingScreen';
import QuestionFlow from './components/QuestionFlow';
import SummaryConfirmation from './components/SummaryConfirmation';
import SummaryEdit from './components/SummaryEdit';
import LoadingReport from './components/LoadingReport';
import ReportView from './components/ReportView';

function App() {
  const [stage, setStage] = useState('landing'); // landing, questions, summary, edit-summary, loading, report
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [answers, setAnswers] = useState({});
  const [summary, setSummary] = useState('');
  const [report, setReport] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showPlans, setShowPlans] = useState(false);
  const [landingAnimating, setLandingAnimating] = useState(false);

  // Start questions after landing animation
  const handleStartQuestions = (pipeline) => {
    setSelectedPipeline(pipeline);
    setLandingAnimating(true);
    setTimeout(() => {
      setStage('questions');
    }, 800);
  };

  // Handle question completion
  const handleQuestionsComplete = async (answersData) => {
  setAnswers(answersData);
  
  try {
    const response = await fetch('http://localhost:5999/api/summary', {  // Changed here
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        pipeline: selectedPipeline, 
        responses: answersData  // Changed from 'answers' to 'responses' to match backend
      })
    });
    const data = await response.json();
    setSummary(data.summary);
    setStage('summary');
  } catch (error) {
    console.error('Error generating summary:', error);
    setSummary('Error generating summary. Please try again.');
    setStage('summary');
  }
};

  // Handle summary confirmation
  const handleSummaryConfirm = async (confirmed) => {
    if (confirmed) {
      setStage('loading');
      // Call backend to generate report
      try {
        const response = await fetch('http://localhost:5000/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pipeline: selectedPipeline, answers, summary })
        });
        const data = await response.json();
        setReport(data.report);
        setPlans(data.plans || []);
        setStage('report');
      } catch (error) {
        console.error('Error generating report:', error);
        setStage('report');
        setReport({ error: 'Failed to generate report. Please try again.' });
      }
    } else {
      setStage('edit-summary');
    }
  };

  // Handle summary edit
  const handleSummaryEdit = async (feedback) => {
    setStage('loading');
    // Call backend to regenerate summary
    try {
      const response = await fetch('http://localhost:5000/api/update-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pipeline: selectedPipeline, answers, currentSummary: summary, feedback })
      });
      const data = await response.json();
      setSummary(data.summary);
      setStage('summary');
    } catch (error) {
      console.error('Error updating summary:', error);
      setStage('summary');
    }
  };

  return (
    <div className="app">
      <Sidebar />
      
      <main className="main-content">
        {stage === 'landing' && (
          <LandingScreen 
            onStart={handleStartQuestions}
            animating={landingAnimating}
          />
        )}

        {stage === 'questions' && (
          <QuestionFlow
            pipeline={selectedPipeline}
            onComplete={handleQuestionsComplete}
            showPlansButton={true}
            onPlansClick={() => setShowPlans(true)}
          />
        )}

        {stage === 'summary' && (
          <SummaryConfirmation
            summary={summary}
            onConfirm={handleSummaryConfirm}
            showPlansButton={true}
            onPlansClick={() => setShowPlans(true)}
          />
        )}

        {stage === 'edit-summary' && (
          <SummaryEdit
            currentSummary={summary}
            onSubmit={handleSummaryEdit}
            showPlansButton={true}
            onPlansClick={() => setShowPlans(true)}
          />
        )}

        {stage === 'loading' && (
          <LoadingReport />
        )}

        {stage === 'report' && (
          <ReportView
            report={report}
            plans={plans}
            showPlansButton={true}
            onPlansClick={() => setShowPlans(true)}
          />
        )}
      </main>

      <PlansSidebar 
        show={showPlans}
        plans={plans}
        onClose={() => setShowPlans(false)}
      />
    </div>
  );
}

export default App;