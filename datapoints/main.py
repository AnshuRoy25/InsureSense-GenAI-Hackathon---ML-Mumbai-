from fastapi import FastAPI, HTTPException, Path, Query
from typing import Any, Dict, List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os

# ---------------------------
# App & DB setup
# ---------------------------

app = FastAPI(
    title="Travel Insurance API",
    version="1.0.0",
    description="API to fetch travel insurance JSON for multiple companies"
)

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://Admin:Aayu0508@cluster0.e6xave1.mongodb.net/?retryWrites=true&w=majority")
DB_NAME = "InsuranceData"   # ← matches your screenshot

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DB_NAME]

# Collections = companies
VALID_COMPANIES = [
    "Alpha",
    "SortedTrav",
    "bridge",
    "grand_traveller",
    "mortage"
]

def get_collection(company: str):
    """
    Map company name to Mongo collection.

    Each company is a separate collection:
    InsuranceData.Alpha, InsuranceData.SortedTrav, etc.
    """
    if company not in VALID_COMPANIES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid company/collection name '{company}'. "
                   f"Allowed: {', '.join(VALID_COMPANIES)}"
        )
    return db[company]

# ---------------------------
# Health / meta endpoints
# ---------------------------

@app.get("/", tags=["Meta"])
async def root():
    return {
        "message": "Travel Insurance API running",
        "database": DB_NAME,
        "companies": VALID_COMPANIES
    }

@app.get("/companies", tags=["Meta"])
async def list_companies():
    """
    Just return the list of available companies (collections).
    """
    return {"companies": VALID_COMPANIES}

# ---------------------------
# Core data endpoints
# ---------------------------

@app.get(
    "/companies/{company_name}/docs",
    tags=["Company"],
    summary="Get all documents for a company"
)
async def get_company_docs(
    company_name: str = Path(..., description="Collection name, e.g. Alpha, SortedTrav")
):
    """
    Returns all documents stored in a given company's collection.
    Useful during development / debugging.
    """
    collection = get_collection(company_name)
    docs: List[Dict[str, Any]] = []
    async for doc in collection.find({}):
        # Convert _id to string for JSON serialization
        doc["_id"] = str(doc["_id"])
        docs.append(doc)

    if not docs:
        raise HTTPException(status_code=404, detail=f"No documents found in '{company_name}'")

    return {
        "company": company_name,
        "count": len(docs),
        "data": docs
    }

@app.get(
    "/companies/{company_name}",
    tags=["Company"],
    summary="Get the main company JSON"
)
async def get_company(
    company_name: str = Path(..., description="Collection name, e.g. Alpha, SortedTrav"),
    index: int = Query(0, description="If multiple docs exist, which index (0-based) to return")
):
    """
    Get the main company JSON document.
    Assumption: you store ONE big document (like we designed)
    per collection. If there are multiple, you can choose by `index`.
    """
    collection = get_collection(company_name)

    docs: List[Dict[str, Any]] = []
    async for doc in collection.find({}):
        docs.append(doc)

    if not docs:
        raise HTTPException(status_code=404, detail=f"No documents found in '{company_name}'")

    if index < 0 or index >= len(docs):
        raise HTTPException(status_code=400, detail=f"Index {index} out of range (0..{len(docs)-1})")

    doc = docs[index]
    doc["_id"] = str(doc["_id"])
    return doc

@app.get(
    "/companies/{company_name}/plans/{plan_id}",
    tags=["Plans"],
    summary="Get a specific plan by planId from a company's JSON"
)
async def get_plan(
    company_name: str = Path(..., description="Collection name e.g. Alpha"),
    plan_id: str = Path(..., description="Plan ID e.g. ALPHA-BASIC-1Y")
):
    """
    Find a plan inside the company's main JSON document,
    assuming structure like:

    {
      "company": "Alpha",
      "plans": [
        { "planId": "ALPHA-BASIC-1Y", ... },
        ...
      ]
    }
    """
    collection = get_collection(company_name)

    # Find the document that contains the plan in its plans array
    doc = await collection.find_one({"plans.planId": plan_id})
    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"Plan '{plan_id}' not found in company '{company_name}'"
        )

    for plan in doc.get("plans", []):
        if plan.get("planId") == plan_id:
            return {
                "company": company_name,
                "plan": plan
            }

    # If somehow we didn't find it in the loop
    raise HTTPException(
        status_code=404,
        detail=f"Plan '{plan_id}' not found in company '{company_name}'"
    )

# ---------------------------
# Insert / replace company doc
# ---------------------------

@app.post(
    "/companies/{company_name}",
    tags=["Admin"],
    summary="Insert a new company JSON document"
)
async def insert_company_doc(
    company_name: str,
    payload: Dict[str, Any]
):
    """
    Insert a new document into the company collection.

    Use this to POST the JSON we created for Alpha, SortedTrav, etc.

    Example:
      POST /companies/Alpha
      body = { ... Alpha JSON ... }
    """
    collection = get_collection(company_name)
    result = await collection.insert_one(payload)
    payload["_id"] = str(result.inserted_id)
    return payload

@app.put(
    "/companies/{company_name}",
    tags=["Admin"],
    summary="Replace existing main company JSON (single-document style)"
)
async def replace_company_doc(
    company_name: str,
    payload: Dict[str, Any]
):
    """
    If you follow a pattern of ONE doc per company collection,
    this endpoint will replace the first existing doc or insert a new one.

    That keeps your collection clean: always only one latest version.
    """
    collection = get_collection(company_name)

    existing = await collection.find_one({})
    if existing:
        await collection.replace_one({"_id": existing["_id"]}, payload)
    else:
        await collection.insert_one(payload)

    # Fetch back to return with _id
    new_doc = await collection.find_one({})
    new_doc["_id"] = str(new_doc["_id"])
    return new_doc
