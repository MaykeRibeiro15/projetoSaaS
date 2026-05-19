'use client';

import { Header } from '@/components/layout/header';
import { useState } from 'react';
import {
  Search,
  Plus,
  FileText,
  User,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const mockRecords = [
  { id: '1', patient: 'Maria Silva Santos', doctor: 'Dr. Roberto', date: '2024-03-18', diagnosis: 'Hipertensão Arterial', type: 'Retorno' },
  { id: '2', patient: 'João Pedro Oliveira', doctor: 'Dr. Roberto', date: '2024-03-17', diagnosis: 'Diabetes Tipo 2', type: 'Primeira Consulta' },
  { id: '3', patient: 'Ana Carolina Ferreira', doctor: 'Dr. Roberto', date: '2024-03-15', diagnosis: 'Ansiedade Generalizada', type: 'Retorno' },
  { id: '4', patient: 'Carlos Eduardo Lima', doctor: 'Dr. Roberto', date: '2024-03-14', diagnosis: 'Lombalgia Crônica', type: 'Retorno' },
  { id: '5', patient: 'Lucia Helena Costa', doctor: 'Dr. Roberto', date: '2024-03-13', diagnosis: 'Check-up Geral', type: 'Rotina' },
];

export default function ProntuarioPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <Header title="Prontuário" subtitle="Registros médicos dos pacientes" />
      
      <div className="p-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="text"
              placeholder="Buscar prontuário por paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#406B5B] text-white rounded-xl hover:bg-[#406B5B]/90 transition-colors text-sm font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Novo Prontuário
          </button>
        </div>

        {/* Records List - Medical cards use light green */}
        <div className="space-y-4">
          {mockRecords.map((record) => (
            <div key={record.id} className="medical-card hover:bg-[#91AE9E]/15 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#91AE9E]/30 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#406B5B]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">{record.patient}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-black/60">
                        <User className="w-3 h-3" />
                        {record.doctor}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-black/60">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">{record.diagnosis}</p>
                    <p className="text-xs text-black/50">{record.type}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-black/30 group-hover:text-[#406B5B] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
