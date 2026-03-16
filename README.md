# GigShield AI - Guidewire DEVTrails 2026 Phase 1

**GigShield AI** is an AI-powered parametric income insurance platform designed for gig workers who lose income due to external disruptions, with a focus on Phase 1 prototype for the DEVTrails hackathon.

## 🎯 Persona & Scenario
**Target Persona:** Food delivery partners (Zomato/Swiggy) operating in Hyderabad, India.  
**Example Scenario:** A Swiggy delivery partner loses 3 days of income during heavy monsoon flooding in areas like Kukatpally or LB Nagar with zero financial safety net today.

## 💡 Solution Summary
An AI-powered parametric income insurance platform where the worker pays a small weekly premium and automatically receives a payout when a verified external disruption fires in their delivery zone. 
**Note:** This is an *incomeloss coverage ONLY* product — strictly no health insurance, no accident coverage, and no vehicle repairs.

## 💳 Weekly Premium Model
GigShield operates on an affordable micro-premium model optimized for daily wage earners:
- **Calculation:** Premiums are dynamically calculated using AI based on local zone risks (e.g., historical flooding data, Air Quality Index trends, and current seasonal alerts). 
- **What the worker pays:** Between **₹35 to ₹80 per week**. For example, a driver in Kukatpally during peak monsoon might pay ₹75/week, while a driver in a low-risk zone in winter might pay ₹35/week.
- **What they receive:** On a valid claim (when a parametric trigger fires), they receive a targeted payout (e.g., ₹500 - ₹1200 per day) to substitute lost earnings for those disrupted days.

## ⚡ Parametric Triggers (Via Mock APIs)
Claims are settled automatically without human intervention when specific conditions ("triggers") are activated:
1. **Heavy Rainfall:** Precipitation above 50mm in a 24-hour window.
2. **Hazardous AQI:** Air Quality Index (AQI) above 300.
3. **Severe Flood Alert:** Official city flood warnings.
4. **Curfew / Local Strike:** Disruptions to public transport and operations.

*In this prototype, trigger data is provided via OpenWeatherMap and Mock JSON APIs.*

## 🤖 AI/ML Integration Plan
Our architecture incorporates AI/ML across the core insurance lifecycle:
- **Risk Scoring at Onboarding:** Evaluates geographic zones and sets base risk.
- **Dynamic Weekly Premium Engine:** Adjusts the ₹35-₹80 premium continuously based on real-time weather and event predictions.
- **Fraud Detection:** Uses anomaly detection on incoming location pings versus reported home zones to prevent spoofing.
- **Predictive Disruption Forecasting:** An admin dashboard feature that anticipates large-scale payouts days before an event like a major cyclone hits.

## 💻 Platform Choice & Tech Stack
**Platform:** **Progressive Web App (PWA) / Mobile WebView.**  
*Justification:* Gig workers have limited storage on entry-level smartphones and switch contexts rapidly. A web app allows them to access the platform instantly between orders from any browser without installing a heavy native app.

**Tech Stack:**
- **Frontend:** React.js (Vite) + Tailwind CSS (Fast, mobile-responsive UI).
- **Backend:** FastAPI (Python) for rapid ML model serving and API routing.
- **Database:** PostgreSQL (Relational consistency for policies and transactions).
- **Integrations:** OpenWeatherMap (free tier) for parametric triggers, Razorpay (test mode) for premium collection, and Mock JSON for AQIs and curfews.

## 📅 6-Week Development Plan (Across 3 Phases)

### Phase 1 (Weeks 1-2): Foundation & UX Prototype *[Current]*
- Create user personas, core concept documentation, and application workflow.
- Build static minimal prototypes (Onboarding, Premium Display, Dashboard).
- Finalize tech stack and architectural diagram.

### Phase 2 (Weeks 3-4): Backend & Trigger Integration
- Deploy FastAPI backend and PostgreSQL database.
- Integrate OpenWeatherMap API and build the parametric rules engine.
- Connect the React frontend to live test APIs.

### Phase 3 (Weeks 5-6): AI/ML & Final Polish
- Train and deploy the dynamic premium pricing engine and risk scoring models.
- Implement Razorpay test mode for weekly premium subscription flows.
- End-to-end testing, bug bashing, and presentation recording for DEVTrails.
