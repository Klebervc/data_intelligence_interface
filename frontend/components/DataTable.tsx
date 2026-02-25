type Row = Record<string, any>;

function formatCell(v: any) {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return new Intl.NumberFormat("pt-BR").format(v);
  return String(v);
}

export default function DataTable({ rows }: { rows: Row[] }) {
  const columns = rows?.length ? Object.keys(rows[0]) : [];

  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4 text-sm text-zinc-600">
        Sem dados para exibir.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10">
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-black/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-zinc-50/60"}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="border-b border-black/5 px-4 py-3 text-zinc-800"
                  >
                    {formatCell(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-2 text-xs text-zinc-500 border-t border-black/10">
        Mostrando {rows.length} linhas
      </div>
    </div>
  );
}
