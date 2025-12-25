# Travel Insurance API (FastAPI + MongoDB)

Simple FastAPI service to expose travel-insurance JSON data stored in MongoDB.  
Each company (Alpha, SortedTrav, bridge, grand_traveller, mortage, etc.) is stored as its **own collection** inside the `InsuranceData` database.

---

## 1. Project Structure

Example structure:

project-root/
├─ main.py # FastAPI application
├─ README.md
├─ alpha.json # Sample JSON for Alpha (optional)
├─ sortedtrav.json # Sample JSON for SortedTrav (optional)
└─ ... # Other company JSONs

text

MongoDB:

InsuranceData
├── Alpha
├── SortedTrav
├── bridge
├── grand_traveller
└── mortage

text

Each collection contains one main document with the company’s product JSON (including `plans` array).

---

## 2. Requirements

- Python 3.10+  
- MongoDB running locally (or Atlas cluster)  
- Recommended: virtual environment

---

## 3. Installation

(optional but recommended)
python -m venv venv

Linux / macOS
source venv/bin/activate

Windows (PowerShell)
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn motor

text

If you want environment variables via a `.env` file:

pip install python-dotenv

text

---

## 4. Configuration

Default MongoDB connection string in `main.py`:

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = "InsuranceData"

text

You can override it:

Local
export MONGODB_URL="mongodb://localhost:27017"

Or MongoDB Atlas
export MONGODB_URL="mongodb+srv://user:password@cluster.mongodb.net/"
text

(Use `set MONGODB_URL=...` on Windows.)

---

## 5. Running the API

Make sure `main.py` contains the FastAPI code and is in the project root.

Start the development server:

uvicorn main:app --reload

text

The API will be available at:

- Base URL: `http://127.0.0.1:8000`
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`  

You can test all endpoints via browser, Postman, or curl.

---

## 6. Core Endpoints

### 6.1 Meta

- `GET /`  
  - Returns API status, database name, and list of company collections.

- `GET /companies`  
  - Returns the list of available companies (collection names).

---

### 6.2 Company data

- `GET /companies/{company_name}/docs`  
  - Example: `/companies/Alpha/docs`  
  - Returns **all documents** in the `Alpha` collection (useful for debugging).

- `GET /companies/{company_name}`  
  - Example: `/companies/Alpha`  
  - Optional query param: `index` (default `0`)  
  - Returns the **main JSON document** for that company (by index if there are multiple docs).

---

### 6.3 Plan data

- `GET /companies/{company_name}/plans/{plan_id}`  
  - Example: `/companies/Alpha/plans/ALPHA-BASIC-1Y`  
  - Looks into the company document’s `plans` array and returns the matching plan.

---

### 6.4 Admin (write) endpoints

- `POST /companies/{company_name}`  
  - Insert a **new** company document into the given collection.  
  - Example URL:  
    - `POST http://127.0.0.1:8000/companies/Alpha`  
  - Headers:
    - `Content-Type: application/json`  
  - Body (raw JSON): full company document, e.g.:

{
"company": "Company Alpha",
"product": "Alpha Basic Travel Insurance",
"currency": "INR",
"notes": "Example Alpha company data",
"plans": [
{
"planId": "ALPHA-BASIC-1Y",
"name": "Alpha Basic 1-Year",
"description": "Single-trip and short multi-trip cover with core medical, accident, baggage and trip protection.",
"term": {
"type": "annual",
"policyDurationYears": 1,
"maxTripDurationDays": 30
},
"targetProfile": "family_travellers",
"coverageScope": {
"tripMode": ["flight", "train"],
"tripRegion": ["domestic", "international"]
},
"pricingModel": {
"type": "zone_and_duration",
"zones": [
{ "zoneCode": "IN", "name": "Domestic India" },
{ "zoneCode": "WWXUS", "name": "Worldwide excluding USA/Canada" }
]
},
"sumInsuredOptions": [
{ "code": "LOW", "amount": 500000 },
{ "code": "MID", "amount": 1000000 }
],
"coverages": {
"medical": {
"enabled": true,
"sumInsuredRef": "plan.sumInsured",
"deductible": 500
},
"personalAccident": {
"enabled": true,
"sumInsured": 1000000
}
},
"cancellationPolicy": {
"freeLookPeriodDays": 15,
"refundRules": [
{
"condition": "policy_cancelled_before_trip_and_within_free_look",
"refundPercent": 100
}
]
}
}
],
"version": 1,
"status": "active"
}

text

(Use your full JSONs for `SortedTrav`, `mortage`, `grand_traveller`, etc., changing only the URL path.)

- `PUT /companies/{company_name}`  
  - Replace the existing **main** company document (first doc in collection) or insert if empty.  
  - Example URL:  
    - `PUT http://127.0.0.1:8000/companies/Alpha`  
  - Headers:
    - `Content-Type: application/json`  
  - Body: same structure as POST (full company document).

---

## 7. Example curl Commands

### 7.1 Insert Alpha JSON

curl -X POST "http://127.0.0.1:8000/companies/Alpha"
-H "Content-Type: application/json"
-d @alpha.json

text

### 7.2 Get all docs for Alpha

curl "http://127.0.0.1:8000/companies/Alpha/docs"

text

### 7.3 Get main Alpha JSON

curl "http://127.0.0.1:8000/companies/Alpha"

text

### 7.4 Get specific plan

curl "http://127.0.0.1:8000/companies/Alpha/plans/ALPHA-BASIC-1Y"

text

---

## 8. Testing With Postman

1. Import the base URL: `http://127.0.0.1:8000`.
2. Create requests for:
   - `GET /`
   - `GET /companies`
   - `GET /companies/Alpha`
   - `GET /companies/Alpha/docs`
   - `GET /companies/Alpha/plans/ALPHA-BASIC-1Y`
   - `POST /companies/Alpha` (Body → raw → JSON → paste Alpha JSON)
3. Check responses and status codes to verify everything works.

---

Happy building and experimenting with your travel insurance API!
