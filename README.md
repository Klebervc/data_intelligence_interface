# data_intelligence_interface

![](LLMs.jpg)

API backend construída com **FastAPI** que converte perguntas em linguagem natural em consultas SQL utilizando o modelo **Gemini 3 Flash Preview** (Google GenAI).

O sistema gera automaticamente queries SQL seguras, executa em um banco SQLite e retorna os resultados estruturados em JSON.

## Objetivo do Projeto

Demonstrar a aplicação prática de LLMs em:

- Text-to-SQL

- Business Intelligence

- AI Engineering

- Sistemas inteligentes baseados em linguagem natural

## Tecnologias Utilizadas

- FastAPI
- Uvicorn
- SQLite
- Google GenAI (Gemini 3 Flash Preview)
- Python 3.12+

## Arquitetura do Projeto

<pre>data_intelligence_interface/
│
backend/
│
├── app/
│   ├── main.py
│   ├── ai_service.py
│   ├── sql_executor.py
│   ├── database.py
│   ├── security.py
│   ├── schemas.py
│   │
│   └── core/
│       ├── config.py
│       ├── prompts.py
│
├── vendas_ficticias.db
├── test_gemini.py
├── list_models.py
├── requirements.txt
├── .env
└── venv/
│
frontend/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│
├── components/
│   ├── ChatBox.tsx
│   ├── DynamicChart.tsx
│   ├── DataTable.tsx
│
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
│
└── README.md (raiz do projeto)</pre>

## Funcionalidades

- Conversão de linguagem natural para SQL
- Integração com modelo Gemini 3 Flash Preview
- Validação de segurança (bloqueia DROP, DELETE, UPDATE, INSERT, ALTER e PRAGMA)
- Execução de consultas apenas `SELECT`
- Documentação automática via Swagger
- Banco de dados fictício gerado automaticamente

## Estrutura do Banco

Tabela: `vendas`

| Coluna          | Tipo    |
| --------------- | ------- |
| id              | INTEGER |
| data            | TEXT    |
| produto         | TEXT    |
| valor_unidade   | REAL    |
| quantidade      | INTEGER |
| total           | REAL    |
| forma_pagamento | TEXT    |
| parcelado       | TEXT    |

## Instalação

### 1. Clone o projeto

```bash
git clone <seu-repositorio>
cd backend
```

### 2️. Crie e ative o ambiente virtual

```bash
python -m venv venv
venv\Scripts\activate (Windows)
source venv/bin/activate (Linux)
```

### 3️. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4️. Instale as dependências do frontend e execute

```bash
cd ../frontend
npm install
npm run dev
```

## Configurar API Key do Gemini

Crie uma variável ambiente

```bash
setx GEMINI_API_KEY "SUA_CHAVE"
```

Após, feche e abra o terminal novamente.

## Gerar Banco de Dados

Execute dentro de backend:

```bash
python app/database.py
```

Isso criará

```bash
vendas_ficticias.db
```

## Rodar o Backend

```bash
uvicorn app.main:app --reload
```

## Rodar o Frontend

Dentro da pasta `frontend/`

```bash
npm run dev
```

Abra no browser:

```bash
http://127.0.0.1:3000
```

## Exemplo de Uso (Swagger)

Abra no browser:

```bash
http://127.0.0.1:8000/docs
```

Endpoint:

```bash
POST /query
```

Query:

```bash
{
  "question": "Qual produto gerou maior receita?"
}
```

Resposta:

```bash
{
  "sql": "SELECT produto, SUM(total) AS total_vendas FROM vendas GROUP BY produto;",
  "summary": "Consulta executada com sucesso.",
  "data": [...]
}
```

## Segurança

O sistema inclui validação SQL:

- Permite apenas SELECT

- Bloqueia: DROP, DELETE, UPDATE, INSERT, ALTER, PRAGMA

- Remove formatação Markdown da resposta do modelo

- Extrai apenas o SQL válido

## Fluxo da Aplicação

1. Usuário faz pergunta no frontend

2. Frontend envia requisição para:

```bash
POST /query
```

3. Backend:

- Envia pergunta para o Gemini 3 Flash Preview

- Gera SQL

- Valida segurança

- Executa no SQLite

- Retorna JSON

4. Frontend:

- Exibe SQL gerado

- Mostra tabela de resultados (JSON)

- Mostra resumo
