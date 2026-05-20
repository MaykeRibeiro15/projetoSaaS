'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Package } from 'lucide-react';

// Mock: TOP 10 produtos/serviços mais vendidos. Quando existir o
// modelo Product/Service no backend, virá de GET /api/v1/products/top.
const data = [
  { name: 'Consulta Clínica', vendas: 184 },
  { name: 'Retorno', vendas: 142 },
  { name: 'Avaliação Cardiológica', vendas: 96 },
  { name: 'Exame ECG', vendas: 81 },
  { name: 'Consulta Dermatológica', vendas: 73 },
  { name: 'Aplicação Botox', vendas: 58 },
  { name: 'Procedimento Estético', vendas: 47 },
  { name: 'Limpeza de Pele', vendas: 39 },
  { name: 'Consulta Nutrição', vendas: 32 },
  { name: 'Pacote Check-up', vendas: 25 },
];

// Paleta da marca em gradiente, do escuro pro claro
const colors = [
  '#406B5B',
  '#4C7868',
  '#598577',
  '#669387',
  '#76A192',
  '#86AE9E',
  '#96BBAA',
  '#A6C7B6',
  '#B6D3C2',
  '#C6DFCE',
];

export function TopProductsChart() {
  const totalVendas = data.reduce((acc, d) => acc + d.vendas, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#E4D5C3]/50 shadow-sm">
      <div className="p-6 border-b border-[#E4D5C3]/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-[#406B5B] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#B89D83]" />
            TOP 10 produtos mais vendidos
          </h2>
          <p className="text-xs text-[#406B5B]/50 mt-1">Ranking do mês</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#406B5B]/50">Vendas no top 10</p>
          <p className="text-xl font-bold text-[#406B5B]">{totalVendas}</p>
          <p className="text-[10px] text-[#91AE9E] font-medium mt-0.5">unidades</p>
        </div>
      </div>
      <div className="p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#E4D5C3" strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              stroke="#406B5B"
              tick={{ fontSize: 11, fill: '#406B5B' }}
              tickLine={false}
              axisLine={{ stroke: '#E4D5C3' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#406B5B"
              tick={{ fontSize: 11, fill: '#406B5B' }}
              tickLine={false}
              axisLine={{ stroke: '#E4D5C3' }}
              width={170}
            />
            <Tooltip
              cursor={{ fill: 'rgba(228, 213, 195, 0.25)' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E4D5C3',
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: '#406B5B', fontWeight: 600 }}
              formatter={(value: number) => [`${value} vendas`, 'Quantidade']}
            />
            <Bar dataKey="vendas" radius={[0, 8, 8, 0]}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={colors[idx % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
