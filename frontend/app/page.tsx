import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-semibold">
              AI
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                Data Intelligence
              </div>
              <div className="text-xs text-zinc-500">NL → SQL + Insights</div>
            </div>
          </div>

          <a
            className="text-sm text-zinc-600 hover:text-zinc-900 transition"
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
          >
            API Docs
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="rounded-3xl bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_30px_60px_-40px_rgba(0,0,0,0.25)] border border-black/5 overflow-hidden">
          <div className="px-8 py-10 sm:px-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              NATURAL LANGUAGE ANALYTICS
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
              Pergunte. Visualize. Decida.
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-600 text-base sm:text-lg">
              Faça perguntas em português e receba SQL seguro (somente SELECT),
              resultados em tabela e gráficos minimalistas.
            </p>

            <div className="mt-10">
              <Chat />
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Dica: tente perguntas como “Qual o total vendido por produto?” ou
          “Mostre as vendas por mês”.
        </p>
      </section>
    </main>
  );
}
