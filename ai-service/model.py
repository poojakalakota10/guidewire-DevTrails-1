import random

def predict_risk(zone, hours_per_week):
    """
    Mock ML Model to predict risk based on zone and working hours.
    Returns: score (0-100), tier (Low, Medium, High), reason, premium_modifier
    """
    # Base risk for zones (mock)
    zone_risk_base = {
        "Koramangala": 60,
        "Whitefield": 40,
        "Indiranagar": 50,
        "HSR Layout": 70,
        "Electronic City": 35,
        "Jayanagar": 45
    }
    
    base_score = zone_risk_base.get(zone, 50)
    
    # Hours factor (more hours = slightly higher risk of exposure)
    hours_modifier = (hours_per_week / 40.0) * 10
    
    # Random factor for simulation
    random_factor = random.randint(-5, 15)
    
    score = base_score + hours_modifier + random_factor
    score = min(max(int(score), 0), 100)
    
    if score >= 70:
        tier = "High"
        premium_modifier = 15
        reason = f"Your zone ({zone}) has a high historical risk of severe weather disruptions, and your working hours expose you to peak risk periods."
    elif score >= 45:
        tier = "Medium"
        premium_modifier = 5
        reason = f"Your zone ({zone}) has moderate historical disruption levels during the upcoming weeks."
    else:
        tier = "Low"
        premium_modifier = -5
        reason = f"Your zone ({zone}) shows low historical risk of disruption right now."
        
    return {
        "score": score,
        "tier": tier,
        "reason": reason,
        "premium_modifier": premium_modifier
    }

def detect_fraud(claim_data):
    """
    Rule-based + ML mock fraud scoring.
    Score 0-100: >70 auto-reject, 40-70 manual review, <40 auto-approve
    """
    score = 0
    reasons = []
    
    # Check GPS
    user_zone = claim_data.get("user_zone")
    disruption_zone = claim_data.get("disruption_zone")
    
    if user_zone != disruption_zone:
        score += 50
        reasons.append(f"GPS zone ({user_zone}) doesn't match disruption zone ({disruption_zone})")
        
    # Check duplicate claims (mock logic)
    recent_claims = claim_data.get("recent_claims", 0)
    if recent_claims >= 2:
        score += 30
        reasons.append(f"High claim frequency: {recent_claims} claims in recent period.")
        
    # Weather mock cross-check
    if not claim_data.get("weather_verified", True):
        score += 40
        reasons.append("Claim trigger event could not be verified with API weather data.")
        
    # Add random ML variability
    score += random.randint(0, 15)
    score = min(score, 100)
    
    if score > 70:
        action = "AUTO_REJECT"
    elif score >= 40:
        action = "MANUAL_REVIEW"
    else:
        action = "AUTO_APPROVE"
        if not reasons:
            reasons.append("All checks passed. Claim clean.")
            
    return {
        "fraud_score": score,
        "action": action,
        "reasons": reasons
    }
