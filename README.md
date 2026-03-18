# GigShield AI - Guidewire DEVTrails 2026 (Phase 1)

GigShield AI is an **AI-powered parametric income insurance platform** designed for gig workers who lose income due to external disruptions. This repository contains the **Phase 1 prototype** for the Guidewire DEVTrails Hackathon.

---

## 🎯 Persona & Scenario

**Target Persona:**  
Food delivery partners (Zomato/Swiggy) operating in Hyderabad, India.

**Example Scenario:**  
A Swiggy delivery partner loses 2–3 days of income during heavy monsoon flooding in areas like Kukatpally or LB Nagar, with **no financial safety net available today**.

---

## 💡 Solution Summary

GigShield AI provides a **weekly micro-insurance model** where gig workers pay a small premium and receive **automatic payouts** when verified external disruptions occur in their delivery zones.

⚠️ Note: This is strictly an **income-loss protection product**  
(No health insurance, no accident coverage, no vehicle repair coverage)

---

## 🔄 Application Workflow

1. User signs up and selects their delivery location  
2. AI performs **risk profiling** based on zone and historical data  
3. Weekly premium is dynamically calculated  
4. System continuously monitors:
   - Weather conditions  
   - AQI levels  
   - Traffic disruptions  
5. When a **parametric trigger** is detected:
   - Delivery disruption is confirmed  
6. AI performs **fraud detection & validation checks**  
7. Claim is automatically triggered  
8. Instant payout is simulated to the worker  

---

## 💳 Weekly Premium Model

GigShield operates on an **affordable micro-premium model** optimized for daily wage earners:

- **Premium Range:** ₹35 – ₹80 per week  
- **Dynamic Pricing:** Based on:
  - Historical flood data  
  - AQI trends  
  - Seasonal risks  

**Example:**
- Kukatpally during monsoon → ₹75/week  
- Low-risk zone in winter → ₹35/week  

**Payout:**
- ₹500 – ₹1200 per day depending on disruption severity  

---

## ⚡ Parametric Triggers (Via Mock APIs)

Claims are automatically triggered when predefined conditions are met:

- 🌧 Heavy Rainfall → > 50mm in 24 hours  
- 🌫 Hazardous AQI → AQI > 300  
- 🌊 Flood Alerts → Official city warnings  
- 🚫 Curfew / Strike → Delivery disruption events  

**Data Sources:**
- OpenWeatherMap API  
- Mock JSON APIs  

---

## 🤖 AI/ML Integration Plan

GigShield AI integrates intelligence across the full insurance lifecycle:

- **Risk Scoring:** Based on geographic and historical data  
- **Dynamic Premium Engine:** Adjusts weekly pricing in real-time  
- **Fraud Detection:** Detects anomalies using location validation  
- **Predictive Forecasting:** Anticipates disruptions before they occur  

---

## 🚀 Prototype Features (Phase 1)

- Interactive **Worker Dashboard**
- AI-based **Risk Score Calculation**
- **Live Risk Map** (Hyderabad zones)
- Simulated **Weather, AQI, and Traffic Monitoring**
- Automatic **Claim Processing Simulation**
- **Fraud Detection Logic**
- **Income Analytics (Gained vs Lost)** using charts
- AI Workflow visualization

---

## 💻 Platform Choice & Tech Stack

### 📱 Platform: Progressive Web App (PWA)

**Why?**
- No installation required  
- Works on low-end devices  
- Fast access during deliveries  

---

### 🛠 Tech Stack

- **Frontend:** React.js (Vite) + Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **Database:** PostgreSQL  
- **APIs:** OpenWeatherMap + Mock APIs  
- **Payments:** Razorpay (Test Mode)  

---

## 📅 Development Plan (6 Weeks)

### Phase 1 (Weeks 1–2) ✅
- Persona & workflow design  
- Prototype UI development  
- Tech stack finalization  

### Phase 2 (Weeks 3–4)
- Backend + API integration  
- Trigger detection system  

### Phase 3 (Weeks 5–6)
- AI/ML model implementation  
- Payment integration  
- Final deployment  

---

## 🎥 Demo Video

👉 [(https://drive.google.com/file/d/1XlGr1x_i34_iE0uZrU1DTmuex4_24ylv/view?usp=drivesdk)]

---

## 👥 Team

- **K.Pooja Bagula** – Team Leader  
- **M.Sri Varshini** – Developer  
- **V.Dhannuja** – Developer  

---

## 🌟 Vision

GigShield AI aims to create a **financial safety net for millions of gig workers**, ensuring that **external disruptions do not disrupt their income stability**.
