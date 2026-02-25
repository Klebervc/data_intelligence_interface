"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import DynamicChart from "./DynamicChart";

type ApiRow = Record<string, any>;

type ApiResponse = {
  sql: string;
  summary: string;
  data: ApiRow[];
};

function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = question.trim().length > 2 && !loading;

  const examples = [
    "Qual o total vendido por produto?",
    "Qual foi a receita total de vendas?",
    "Quais foram as vendas por forma de pagamento?",
    "Mostre a receita por mês (YYYY-MM).",
  ];

  const sendQuestion = async () => {
    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post<ApiResponse>("http://localhost:8000/query", {
        question: question.trim(),
      });
      setResponse(res.data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.message ||
        "Falha ao consultar a API. Verifique se o backend está rodando.";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => {
    if (!response?.data?.length) return [];
    return Object.keys(response.data[0]);
  }, [response]);

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="rounded-2xl border border-black/5 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label className="sr-only">Pergunta</label>
            <div className="relative">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex.: Qual o valor total vendido por produto?"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 pr-10 text-[15px] outline-none
                           focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canSend) sendQuestion();
                }}
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                ⏎
              </div>
            </div>
          </div>

          <button
            onClick={sendQuestion}
            disabled={!canSend}
            className={classNames(
              "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
              "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.55)]",
              canSend
                ? "bg-black text-white hover:bg-black/90 active:scale-[0.98]"
                : "bg-zinc-200 text-zinc-500 cursor-not-allowed",
            )}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Consultando
              </>
            ) : (
              <>
                Enviar
                <span className="text-white/60">→</span>
              </>
            )}
          </button>
        </div>

        {/* Example chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setQuestion(ex)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-zinc-700
                         hover:bg-zinc-50 hover:border-black/15 transition"
              type="button"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-700">
          <div className="font-semibold">Erro</div>
          <div className="mt-1">{error}</div>
        </div>
      )}

      {/* Results */}
      {response && (
        <div className="grid grid-cols-1 gap-6">
          {/* Summary + SQL */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                  RESULTADO
                </div>
                <div className="mt-2 text-base sm:text-lg font-semibold tracking-tight">
                  {response.summary || "Consulta executada."}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {response.data?.length ?? 0} linhas
                <span className="text-zinc-400">•</span>
                {columns.length} colunas
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs font-semibold text-zinc-500">SQL</div>
              <pre className="mt-2 overflow-x-auto rounded-2xl border border-black/10 bg-[#0b0b0c] p-4 text-[12.5px] leading-relaxed text-zinc-100">
                {response.sql}
              </pre>
            </div>
          </div>

          {/* Table + Chart */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)]">
              <div className="text-sm font-semibold tracking-tight">Tabela</div>
              <div className="mt-4">
                <DataTable rows={response.data} />
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)]">
              <div className="text-sm font-semibold tracking-tight">
                Gráfico
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Visualização automática (bar/line) baseada nas colunas
                retornadas.
              </p>
              <div className="mt-4">
                <DynamicChart rows={response.data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
