'use client';

import { Header } from '@/components/layout/header';
import { useState } from 'react';
import {
  Search,
  Plus,
  ClipboardList,
  User,
  Calendar,
  ChevronRight,
  Heart,
  Activity,
} from 'lucide-react';

const mockAnamneses = [
  { id: '1', patient: 'Maria Silva Santos', date: '2024-03-18', complaint: 'Dor de cabeça frequente há 2 semanas', status: 'Completa' },
  { id: '2', patient: 'João Pedro Oliveira', date: '2024-03-17', complaint: 'Fadiga e perda de peso involuntária', status: 'Completa' },
  { id: '3', patient: 'Ana Carolina Ferreira', date: '2024-03-15', complaint: 'Insônia e irritabilidade', status: 'Em andamento' },
  { id: '4', patient: 'Carlos Eduardo Lima', date: '2024-03-14', complaint: 'Dor lombar irradiando para perna', status: 'Completa' },
  { id: '5', patient: 'Lucia Helena Costa', date: '2024-03-13', complaint: 'Exames de rotina', status: 'Completa' },
];

export default function AnamnesePage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <Header title="Anamnese" subtitle="Histórico clínico e entrevista médica" />
      
      <div className="p-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="text"
              placeholder="Buscar anamnese por paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#406B5B] text-white rounded-xl hover:bg-[#406B5B]/90 transition-colors text-sm font-medium shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Anamnese
          </button>
        </div>

        {/* Template Section */}
        <div className="anamnesis-card mb-8">
          <h2 className="text-lg font-heading font-semibold text-black mb-4">
            Modelo de Anamnese
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Heart, title: 'Queixa Principal', desc: 'Motivo da consulta' },
              { icon: Activity, title: 'HDA', desc: 'História da doença atual' },
              { icon: ClipboardList, title: 'Antecedentes', desc: 'Pessoais e familiares' },
            ].map((item, i) => (
              <div key={i} className="bg-white/70 rounded-xl p-4 border border-[#91AE9E]/20">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="w-5 h-5 text-[#406B5B]" />
                  <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                </div>
                <p className="text-xs text-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anamnesis List */}
        <h2 className="text-lg font-heading font-semibold text-[#406B5B] mb-4">
          Anamneses Recentes
        </h2>
        <div className="space-y-4">
          {mockAnamneses.map((anamnese) => (
            <div key={anamnese.id} className="anamnesis-card hover:bg-[#91AE9E]/20 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#91AE9E]/30 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-[#406B5B]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">{anamnese.patient}</h3>
                    <p className="text-sm text-black/70 mt-0.5">{anamnese.complaint}</p>
                    <span className="flex items-center gap-1 text-xs text-black/50 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(anamnese.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    anamnese.status === 'Completa' 
                      ? 'bg-[#91AE9E]/30 text-[#406B5B]' 
                      : 'bg-[#B89D83]/30 text-[#B89D83]'
                  }`}>
                    {anamnese.status}
                  </span>
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
