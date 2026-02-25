import sqlite3

DB_PATH = "vendas_ficticias.db"


def execute_sql(sql: str):

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(sql)
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]