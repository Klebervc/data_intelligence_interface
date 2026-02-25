"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Row = Record<string, any>;

function pickKeys(rows: Row[]) {
  const keys = rows?.length ? Object.keys(rows[0]) : [];
  // tenta achar uma coluna "data" / "mes" / "produto" etc como X
  const xCandidates = [
    "data",
    "mes",
    "produto",
    "forma_pagamento",
    "parcelado",
    "id",
  ];
  const xKey = xCandidates.find((k) => keys.includes(k)) ?? keys[0];

  // Y: primeiro número que não seja o xKey
  const yKey =
    keys.find((k) => k !== xKey && typeof rows[0]?.[k] === "number") ??
    keys.find((k) => k !== xKey) ??
    keys[1];

  return { xKey, yKey, keys };
}

function SmartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl px-4 py-3 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)]">
      <div className="text-xs font-semibold text-zinc-500"> {label} </div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">
        {payload[0].value}
      </div>
    </div>
  );
}

export default function DynamicChart({ rows }: { rows: Row[] }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4 text-sm text-zinc-600">
        Sem dados para plotar.
      </div>
    );
  }

  const { xKey, yKey } = pickKeys(rows);

  // se xKey parece data (YYYY-MM-DD) ou (YYYY-MM), usa linha
  const sampleX = String(rows[0]?.[xKey] ?? "");
  const looksLikeDate = /^\d{4}-\d{2}(-\d{2})?$/.test(sampleX);

  const commonProps = {
    data: rows,
    margin: { top: 10, right: 10, bottom: 0, left: 0 },
  };

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {looksLikeDate ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(0,0,0,0.08)" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<SmartTooltip />} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="rgba(0,0,0,0.85)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        ) : (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(0,0,0,0.08)" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(0,0,0,0.55)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<SmartTooltip />} />
            <Bar
              dataKey={yKey}
              radius={[10, 10, 10, 10]}
              fill="rgba(0,0,0,0.85)"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
