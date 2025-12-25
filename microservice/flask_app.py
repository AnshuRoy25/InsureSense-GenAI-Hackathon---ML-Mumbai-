from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import uuid

app = Flask(__name__)
CORS(app)

ADK_SERVER = "http://127.0.0.1:8000"

@app.route('/summarize', methods=['POST'])
def summarize():
    """
    Takes JSON data and returns a summary
    """
    try:
        data = request.json
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Convert JSON to string
        data_string = json.dumps(data, indent=2)
        query = f"Summarize this insurance form data in 3-4 clear sentences:\n\n{data_string}"
        
        # Generate unique session ID
        session_id = f"s_{uuid.uuid4().hex[:8]}"
        
        print(f"[DEBUG] Calling ADK /run endpoint")
        
        # Call ADK using /run endpoint with everything in JSON body
        response = requests.post(
            f"{ADK_SERVER}/run",
            json={
                "appName": "my_agent",
                "userId": "user1",
                "sessionId": "session1",
                "newMessage": {
                    "role": "user",
                    "parts": [{"text": query}]
                }
            },
            
            headers={"Content-Type": "application/json"}
        )
        
        print(f"[DEBUG] Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"[DEBUG] Error: {response.text}")
            return jsonify({
                'success': False,
                'error': f'ADK returned {response.status_code}: {response.text}'
            }), 500
        
        # Extract summary from response
        events = response.json()
        summary = ""
        
        # Get the last text from events
        for event in events:
            if isinstance(event, dict) and 'content' in event:
                if 'parts' in event['content']:
                    for part in event['content']['parts']:
                        if isinstance(part, dict) and 'text' in part:
                            summary = part['text']
        
        if not summary:
            return jsonify({
                'success': False,
                'error': 'No summary generated'
            }), 500
        
        return jsonify({
            'success': True,
            'summary': summary.strip()
        }), 200
        
    except requests.exceptions.ConnectionError:
        return jsonify({
            'success': False,
            'error': 'Cannot connect to ADK server. Is it running on port 8000?'
        }), 500
    except Exception as e:
        print(f"[DEBUG] Exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    print("🚀 Flask server starting on http://localhost:5000")
    print("📡 Expecting ADK server on http://127.0.0.1:8000")
    app.run(host='0.0.0.0', port=5000, debug=True)
