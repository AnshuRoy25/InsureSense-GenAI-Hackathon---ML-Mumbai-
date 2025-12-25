# InsureSense

> AI which decides when to insure, not just what to insure.

InsureSense is an intelligent insurance advisory platform that helps users make informed decisions about travel, health, and life insurance through conversational AI and real-time risk analysis.

## 🎯 Features

- **Multi-Pipeline Support**: Travel, Health, Life, Car, Home insurance flows
- **Conversational Interface**: Natural question-based data collection
- **AI-Powered Risk Analysis**: Real-time news integration and risk scoring
- **Personalized Reports**: Detailed risk breakdowns with financial impact analysis
- **Interactive Chat**: Post-report Q&A to understand your coverage needs
- **Smart Recommendations**: Coverage suggestions based on your specific situation

## 🏗️ Architecture

```
insuresense/
├── frontend/           # React + Vite frontend application
├── backend/            # Node.js + Express API server
├── microservice/       # Python Flask + Google ADK (summarization)
└── micronews/         # Python Flask + Google ADK (news fetching)
```

### Tech Stack

**Frontend:**
- React 19.2
- Vite 7.2
- CSS3 (Custom Design System)

**Backend:**
- Node.js with Express 5.2
- CORS enabled
- REST API architecture

**Microservices:**
- Python Flask
- Google Agent Development Kit (ADK)
- NewsAPI integration
- Gemini 2.5 Flash model

## 📋 Prerequisites

- Node.js 20.19+ or 22.12+
- Python 3.8+
- npm or yarn
- Google ADK installed
- NewsAPI key (for news microservice)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd insuresense
```

### 2. Frontend Setup

```bash
cd frontend/insuresense
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 3. Backend Setup

```bash
cd backend
npm install
node src/server.js
```

Backend will run on: `http://localhost:5999`

### 4. Summarization Microservice Setup

```bash
cd microservice
pip install flask flask-cors requests google-adk

# Start ADK server
adk start my_agent

# In another terminal, start Flask
python flask_app.py
```

Microservice will run on: `http://localhost:5000`
ADK server will run on: `http://localhost:8000`

### 5. News Microservice Setup (Optional)

```bash
cd micronews
pip install flask flask-cors requests google-adk

# Update NEWS_API_KEY in news_agent/agent.py
# Start ADK server
adk start news_agent

# In another terminal, start Flask
python flask_app.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5999
MONGODB_URI=mongodb://localhost:27017/insuresense
frontendURL=http://localhost:5173
jwtSecretkey=your-secret-key-here
```

### NewsAPI Configuration

Edit `micronews/news_agent/agent.py` and update:

```python
NEWS_API_KEY = 'your-newsapi-key-here'
```

Get your free API key from [NewsAPI.org](https://newsapi.org)

## 📁 Project Structure

```
insuresense/
│
├── frontend/insuresense/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── LandingScreen.jsx
│   │   │   ├── QuestionFlow.jsx
│   │   │   ├── SummaryConfirmation.jsx
│   │   │   ├── ReportView.jsx
│   │   │   └── ...
│   │   ├── questions/         # Question flows
│   │   │   ├── travelQuestions.js
│   │   │   ├── healthQuestions.js
│   │   │   └── lifeQuestions.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   │   └── converters/   # JSON converters
│   │   └── server.js
│   └── package.json
│
├── microservice/
│   ├── my_agent/
│   │   ├── agent.py          # Summarization agent
│   │   └── __init__.py
│   └── flask_app.py          # Flask server
│
└── micronews/
    ├── news_agent/
    │   ├── agent.py          # News fetching agent
    │   └── __init__.py
    └── flask_app.py          # Flask server
```

## 🎮 Usage Flow

1. **Landing**: User selects insurance type (Travel/Health/Life/etc.)
2. **Questions**: AI-driven conversational form collects necessary information
3. **Summary**: System generates and displays a summary for user confirmation
4. **Analysis**: Backend processes data and generates risk analysis report
5. **Report**: User views detailed risk breakdown with recommendations
6. **Chat**: User can ask questions about the report

## 🔌 API Endpoints

### Backend (Port 5999)

```
GET  /health                    # Health check
POST /api/summary               # Generate summary from responses
POST /api/summary/correct       # Update summary based on feedback
POST /api/convert               # Convert to standard JSON format
```

### Microservice (Port 5000)

```
POST /summarize                 # Summarize user responses
```

## 🎨 Design System

Custom CSS variables for consistent theming:

```css
--bg-dark: #1a1a1a
--bg-medium: #2d2d2d
--bg-card: #3a3a3a
--text-primary: #e5e5e5
--text-secondary: #a0a0a0
--accent-red: #d32f2f
--accent-red-hover: #b71c1c
```

## 🧪 Testing

```bash
# Frontend
cd frontend/insuresense
npm run lint

# Backend
cd backend
npm test
```

## 📦 Building for Production

### Frontend

```bash
cd frontend/insuresense
npm run build
# Output in dist/
```

### Backend

```bash
cd backend
npm run build
```

## 🐛 Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Ensure backend is running on port 5999
- Check CORS configuration in `backend/src/server.js`

**Microservice connection error:**
- Verify ADK server is running on port 8000
- Check Flask server is running on port 5000
- Confirm `ADK_SERVER` URL in `flask_app.py`

**NewsAPI errors:**
- Verify API key is correct
- Check API rate limits (free tier: 100 requests/day)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC License

## 👥 Team

InsureSense Development Team

## 🔗 Links

- [Google ADK Documentation](https://cloud.google.com/vertex-ai/docs)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, Node.js, Python, and Google ADK
