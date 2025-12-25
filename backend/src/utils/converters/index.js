import convertTravel from './travelConverter.js';
import convertHealth from './healthConverter.js';
import convertLife from './lifeConverter.js';

export function convertToStandardJSON(pipeline, responses) {
  let data;

  // Route to the correct converter based on pipeline
  switch(pipeline) {
    case 'travel':
      data = convertTravel(responses);
      break;
    case 'health':
      data = convertHealth(responses);
      break;
    case 'life':
      data = convertLife(responses);
      break;
    default:
      throw new Error(`Invalid pipeline: ${pipeline}`);
  }

  // Add metadata to all responses
  return {
    metadata: {
      timestamp: new Date().toISOString(),  // When conversion happened
      pipeline: pipeline                     // Which pipeline it came from
    },
    ...data  // Spread the pipeline-specific data
  };
}
