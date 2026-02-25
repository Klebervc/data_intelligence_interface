from google import genai
import os
import re

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_sql(question: str):

    prompt = f"""
    Você está consultando um banco SQLite com a seguinte estrutura:

    Tabela (nome EXATO, case-sensitive): vendas

    Colunas:
    - id
    - data
    - produto
    - valor_unidade
    - quantidade
    - total
    - forma_pagamento
    - parcelado

    REGRAS IMPORTANTES:
    - Use exatamente o nome da tabela: vendas
    - Não use Vendas, VENDAS ou outro nome
    - Use apenas SELECT
    - Não invente tabelas
    - Retorne apenas o SQL puro
    - Sempre use alias para funções agregadas.
    Exemplo: SUM(total) AS total_vendas

    Pergunta:
    {question}
    """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=f"{prompt}\nPergunta:\n{question}"
    )

    sql = response.text.strip()
    sql = re.sub(r"```sql|```", "", sql, flags=re.IGNORECASE).strip()
    match = re.search(r"(SELECT .*);?", sql, re.IGNORECASE | re.DOTALL)
    if match:
        sql = match.group(1)

    return sql.strip()