import { useState, useEffect } from 'react';
import './QuestionFlow.css';
import { travelQuestions } from '../questions/travelQuestions';
import { healthQuestions } from '../questions/healthQuestions';
import { lifeQuestions } from '../questions/lifeQuestions';

function QuestionFlow({ pipeline, onComplete, showPlansButton, onPlansClick }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Load questions based on pipeline
    let questionSet = [];
    if (pipeline === 'travel') questionSet = travelQuestions;
    else if (pipeline === 'health') questionSet = healthQuestions;
    else if (pipeline === 'life') questionSet = lifeQuestions;
    
    setQuestions(questionSet.filter(q => q.id !== 'q1_reason')); // Skip the first entry question
  }, [pipeline]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // All questions answered
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  if (!currentQuestion) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="question-flow">
      {showPlansButton && (
        <button className="plans-button" onClick={onPlansClick}>
          Plans
        </button>
      )}

      <div className="question-header">
        <div className="logo-mini">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#d32f2f" strokeWidth="2"/>
            <path d="M16 10C16 10 12 12 12 16C12 20 16 22 16 22C16 22 20 20 20 16C20 12 16 10 16 10Z" fill="#d32f2f"/>
          </svg>
          <span>InsureSense</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">{currentQuestionIndex + 1} / {questions.length}</span>
      </div>

      <div className="question-container fade-in" key={currentQuestion.id}>
        <h2 className="question-text">{currentQuestion.text}</h2>

        {currentQuestion.type === 'single_choice' && (
          <div className="options-container">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                className="option-button"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'multi_choice' && (
          <MultiChoice
            options={currentQuestion.options}
            value={answers[currentQuestion.id] || []}
            onChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            onNext={() => handleAnswer(answers[currentQuestion.id] || [])}
          />
        )}

        {currentQuestion.type === 'text' && (
          <TextInput
            value={answers[currentQuestion.id] || ''}
            onChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            onNext={() => handleAnswer(answers[currentQuestion.id] || '')}
          />
        )}

        {currentQuestion.type === 'number' && (
          <NumberInput
            value={answers[currentQuestion.id] || ''}
            onChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            onNext={() => handleAnswer(answers[currentQuestion.id] || '')}
          />
        )}

        {currentQuestion.type === 'date' && (
          <DateInput
            value={answers[currentQuestion.id] || ''}
            onChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            onNext={() => handleAnswer(answers[currentQuestion.id] || '')}
          />
        )}

        {currentQuestion.type === 'group' && (
          <GroupInput
            fields={currentQuestion.fields}
            value={answers[currentQuestion.id] || {}}
            onChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
            onNext={() => handleAnswer(answers[currentQuestion.id] || {})}
          />
        )}
      </div>
    </div>
  );
}

function MultiChoice({ options, value, onChange, onNext }) {
  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option.value}
            className={`option-button ${value.includes(option.value) ? 'selected' : ''}`}
            onClick={() => toggleOption(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button className="next-button" onClick={onNext}>Continue</button>
    </>
  );
}

function TextInput({ value, onChange, onNext }) {
  return (
    <div className="input-container">
      <input
        type="text"
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        autoFocus
      />
      <button className="next-button" onClick={onNext} disabled={!value}>Continue</button>
    </div>
  );
}

function NumberInput({ value, onChange, onNext }) {
  return (
    <div className="input-container">
      <input
        type="number"
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a number..."
        autoFocus
      />
      <button className="next-button" onClick={onNext} disabled={!value}>Continue</button>
    </div>
  );
}

function DateInput({ value, onChange, onNext }) {
  return (
    <div className="input-container">
      <input
        type="date"
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <button className="next-button" onClick={onNext} disabled={!value}>Continue</button>
    </div>
  );
}

function GroupInput({ fields, value, onChange, onNext }) {
  const handleFieldChange = (fieldId, fieldValue) => {
    onChange({ ...value, [fieldId]: fieldValue });
  };

  const isComplete = fields.every(field => value[field.id]);

  return (
    <div className="group-input-container">
      {fields.map((field) => (
        <div key={field.id} className="field-group">
          <label className="field-label">{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              className="text-input"
              value={value[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.label}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              className="text-input"
              value={value[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.label}
            />
          )}
          {field.type === 'single_choice' && (
            <select
              className="select-input"
              value={value[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              <option value="">Select...</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button className="next-button" onClick={onNext} disabled={!isComplete}>Continue</button>
    </div>
  );
}

export default QuestionFlow;