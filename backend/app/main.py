from fastapi import FastAPI, HTTPException
from app.schemas import QueryRequest, QueryResponse
from app.ai_service import generate_sql
from app.sql_executor import execute_sql
from app.security import validate_sql
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query", response_model=QueryResponse)
def query_db(request: QueryRequest):

    try:
        sql = generate_sql(request.question)
        validate_sql(sql)
        result = execute_sql(sql)

        return {
            "sql": sql,
            "summary": "Consulta executada com sucesso.",
            "data": result
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))