'use client';

import { Header } from '@/components/layout/header';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  User,
} from 'lucide-react';

type ViewMode = 'day' | 'week' | 'month';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
];

const mockAppointments = [
  { id: '1', time: '08:00', duration: 30, patient: 'Maria Silva', type: 'Retorno', status: 'CONFIRMED' },
  { id: '2', time: '09:00', duration: 30, patient: 'João Santos', type: 'Primeira Consulta', status: 'SCHEDULED' },
  { id: '3', time: '10:00', duration: 60, patient: 'Ana Oliveira', type: 'Procedimento', status: 'CONFIRMED' },
  { id: '4', time: '11:00', duration: 30, patient: 'Carlos Mendes', type: 'Retorno', status: 'CONFIRMED' },
  { id: '5', time: '14:00', duration: 30, patient: 'Lucia Ferreira', type: 'Rotina', status: 'SCHEDULED' },
  { id: '6', time: '15:30', duration: 30, patient: 'Pedro Costa', type: 'Urgência', status: 'CONFIRMED' },
];

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-[#406B5B] border-[#406B5B]',
  SCHEDULED: 'bg-[#91AE9E] border-[#91AE9E]',
  CANCELED: 'bg-red-400 border-red-400',
  RESCHEDULED: 'bg-[#B89D83] border-[#B89D83]',
  COMPLETED: 'bg-gray-400 border-gray-400',
  NO_SHOW: 'bg-gray-300 border-gray-300',
};

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentDate);

  return (
    <div>
      <Header title="Agenda" subtitle="Gerencie seus horários e consultas" />
      
      <div className="p-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E4D5C3] p-1">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
                className="p-2 rounded-lg hover:bg-[#E4D5C3]/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#406B5B]" />
              </button>
              <span className="px-3 text-sm font-medium text-[#406B5B] capitalize min-w-[200px] text-center">
                {formattedDate}
              </span>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
                className="p-2 rounded-lg hover:bg-[#E4D5C3]/30 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#406B5B]" />
              </button>
            </div>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2.5 text-sm font-medium text-[#406B5B] bg-[#E4D5C3]/30 hover:bg-[#E4D5C3]/50 rounded-xl transition-colors"
            >
              Hoje
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* View modes */}
            <div className="flex bg-white rounded-xl border border-[#E4D5C3] p-1">
              {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    viewMode === mode
                      ? 'bg-[#406B5B] text-white'
                      : 'text-[#406B5B]/60 hover:text-[#406B5B]'
                  }`}
                >
                  {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : 'Mês'}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#406B5B] text-white rounded-xl hover:bg-[#406B5B]/90 transition-colors text-sm font-medium shadow-sm">
              <Plus className="w-4 h-4" />
              Nova Consulta
            </button>
          </div>
        </div>

        {/* Calendar - Day View */}
        <div className="bg-white rounded-2xl border border-[#E4D5C3]/50 shadow-sm overflow-hidden">
          <div className="divide-y divide-[#E4D5C3]/30">
            {timeSlots.map((slot) => {
              const appointment = mockAppointments.find((a) => a.time === slot);
              return (
                <div key={slot} className="flex min-h-[60px]">
                  <div className="w-20 flex-shrink-0 flex items-start justify-end pr-4 pt-3 border-r border-[#E4D5C3]/30">
                    <span className="text-xs font-mono text-[#406B5B]/50">{slot}</span>
                  </div>
                  <div className="flex-1 p-2">
                    {appointment && (
                      <div className={`p-3 rounded-xl text-white ${statusColors[appointment.status]} cursor-pointer hover:opacity-90 transition-opacity`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5" />
                            <span className="text-sm font-medium">{appointment.patient}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{appointment.duration}min</span>
                          </div>
                        </div>
                        <p className="text-xs opacity-80 mt-1">{appointment.type}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#406B5B]" />
            <span className="text-xs text-[#406B5B]/60">Confirmado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#91AE9E]" />
            <span className="text-xs text-[#406B5B]/60">Agendado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#B89D83]" />
            <span className="text-xs text-[#406B5B]/60">Reagendado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-xs text-[#406B5B]/60">Cancelado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
