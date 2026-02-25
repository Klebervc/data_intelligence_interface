from pydantic import BaseModel
from typing import List, Dict, Any

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    sql: str
    summary: str
    data: List[Dict[str, Any]]