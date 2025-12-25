import express from 'express';
import { convertToStandardJSON } from '../utils/converters/index.js';

const router = express.Router();

const PYTHON_MICROSERVICE = 'http://localhost:5000';

// Called after second-last question (before confirmation)
router.post('/summary', async (req, res) => {
  try {
    const { pipeline, responses } = req.body;

    if (!pipeline || !responses) {
      return res.status(400).json({ 
        error: 'Missing pipeline or responses' 
      });
    }

    // Validate pipeline type
    const validPipelines = ['travel', 'health', 'car', 'home', 'life', 'general'];
    if (!validPipelines.includes(pipeline)) {
      return res.status(400).json({ 
        error: 'Invalid pipeline type' 
      });
    }

    console.log(`[Node.js] Calling Python microservice for ${pipeline} summary`);

    // Call Python microservice using fetch
    const pythonResponse = await fetch(`${PYTHON_MICROSERVICE}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(responses),
      signal: AbortSignal.timeout(60000) // 60 second timeout
    });

    if (!pythonResponse.ok) {
      const errorData = await pythonResponse.json();
      return res.status(pythonResponse.status).json({
        success: false,
        error: errorData.error || 'Python microservice error'
      });
    }

    const data = await pythonResponse.json();
    console.log(`[Node.js] ✅ Summary received`);

    // Return the response
    res.json({
      success: true,
      summary: data.summary,
      confirmation_question: "Does this summary look accurate, or would you like to adjust anything?"
    });

  } catch (error) {
    console.error('[Node.js] ❌ Error calling Python microservice:', error.message);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Request timeout - Python microservice took too long'
      });
    }

    if (error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: 'Cannot connect to Python microservice. Is it running on port 5000?'
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});


// Called when user selects "No" and wants to make changes
router.post('/summary/correct', async (req, res) => {
  try {
    const { pipeline, responses, userFeedback, previousSummary } = req.body;

    if (!pipeline || !responses || !userFeedback) {
      return res.status(400).json({ 
        error: 'Missing pipeline, responses, or userFeedback' 
      });
    }

    // Validate pipeline type
    const validPipelines = ['travel', 'health', 'car', 'home', 'life', 'general'];
    if (!validPipelines.includes(pipeline)) {
      return res.status(400).json({ 
        error: 'Invalid pipeline type' 
      });
    }

    // Call summary corrector agent to update based on user feedback
    const { correctedSummary, updatedResponses } = await correctSummary(
      pipeline, 
      responses, 
      userFeedback,
      previousSummary
    );

    res.json({
      success: true,
      summary: correctedSummary,
      updatedResponses: updatedResponses,
      confirmation_question: "Does this updated summary look accurate now?"
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// Called after answering yes to confirmation question
router.post('/convert', (req, res) => {
  try {
    const { pipeline, responses } = req.body;

    if (!pipeline || !responses) {
      return res.status(400).json({ 
        error: 'Missing pipeline or responses' 
      });
    }

    const standardJSON = convertToStandardJSON(pipeline, responses);

    res.json({
      success: true,
      data: standardJSON
    });

  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

export default router;



