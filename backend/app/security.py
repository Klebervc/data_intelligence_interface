import re

FORBIDDEN = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "PRAGMA"]

def validate_sql(query: str):
    upper_query = query.upper()

    for word in FORBIDDEN:
        if word in upper_query:
            raise ValueError("Comando SQL não permitido.")

    if not upper_query.strip().startswith("SELECT"):
        raise ValueError("Apenas consultas SELECT são permitidas.")

    return True