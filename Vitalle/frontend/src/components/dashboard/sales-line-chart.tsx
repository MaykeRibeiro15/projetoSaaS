'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Mock: últimos 7 dias. Quando o backend de Payments/Sales estiver
// pronto, esses dados virão de GET /api/v1/payments/sales-by-day.
const data = [
  { day: 'Qua 13/05', vendas: 1240, consultas: 8 },
  { day: 'Qui 14/05', vendas: 1875, consultas: 11 },
  { day: 'Sex 15/05', vendas: 2310, consultas: 14 },
  { day: 'Sáb 16/05', vendas: 980, consultas: 6 },
  { day: 'Dom 17/05', vendas: 420, consultas: 3 },
  { day: 'Seg 18/05', vendas: 2640, consultas: 16 },
  { day: 'Ter 19/05', vendas: 3120, consultas: 19 },
];

const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export function SalesLineChart() {
  const total = data.reduce((acc, d) => acc + d.vendas, 0);
  const media = total / data.length;

  return (
    <div className="bg-white rounded-2xl border border-[#E4D5C3]/50 shadow-sm">
      <div className="p-6 border-b border-[#E4D5C3]/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-[#406B5B] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#91AE9E]" />
            Vendas por dia
          </h2>
          <p className="text-xs text-[#406B5B]/50 mt-1">Últimos 7 dias</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#406B5B]/50">Total do período</p>
          <p className="text-xl font-bold text-[#406B5B]">{formatBRL(total)}</p>
          <p className="text-[10px] text-[#91AE9E] font-medium mt-0.5">
            Média {formatBRL(media)}/dia
          </p>
        </div>
      </div>
      <div className="p-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#E4D5C3" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#406B5B"
              tick={{ fontSize: 11, fill: '#406B5B' }}
              tickLine={false}
              axisLine={{ stroke: '#E4D5C3' }}
            />
            <YAxis
              stroke="#406B5B"
              tick={{ fontSize: 11, fill: '#406B5B' }}
              tickLine={false}
              axisLine={{ stroke: '#E4D5C3' }}
              tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E4D5C3',
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: '#406B5B', fontWeight: 600 }}
              formatter={(value: number, name: string) => {
                if (name === 'vendas') return [formatBRL(value), 'Vendas'];
                if (name === 'consultas') return [`${value} consultas`, 'Consultas'];
                return [value, name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#406B5B', paddingTop: 8 }}
              formatter={(value) =>
                value === 'vendas' ? 'Vendas (R$)' : 'Consultas (un.)'
              }
            />
            <Line
              type="monotone"
              dataKey="vendas"
              stroke="#406B5B"
              strokeWidth={3}
              dot={{ r: 4, fill: '#406B5B', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#91AE9E', stroke: '#406B5B', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="consultas"
              stroke="#B89D83"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3, fill: '#B89D83', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
