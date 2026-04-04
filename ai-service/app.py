from flask import Flask, request, jsonify
from flask_cors import CORS
import model
import os

app = Flask(__name__)
CORS(app) # allow requests from frontend/backend

@app.route('/api/ai/risk-score', methods=['POST'])
def get_risk_score():
    """
    Expects JSON: { "zone": "Koramangala", "hours_per_week": 45, "platform": "Zomato" }
    """
    data = request.json
    zone = data.get('zone', 'Unknown')
    hours_per_week = data.get('hours_per_week', 40)
    
    risk_profile = model.predict_risk(zone, hours_per_week)
    
    return jsonify(risk_profile), 200

@app.route('/api/ai/fraud-score', methods=['POST'])
def get_fraud_score():
    """
    Expects JSON: { "user_zone": "Koramangala", "disruption_zone": "Koramangala", "recent_claims": 0, "weather_verified": true }
    """
    data = request.json
    fraud_profile = model.detect_fraud(data)
    
    return jsonify(fraud_profile), 200

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "gigshield-ai-microservice"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
