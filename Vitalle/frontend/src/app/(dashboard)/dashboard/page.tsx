'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { SalesLineChart } from '@/components/dashboard/sales-line-chart';
import { TopProductsChart } from '@/components/dashboard/top-products-chart';
import { NewAppointmentModal } from '@/components/dashboard/new-appointment-modal';
import { NewPatientModal } from '@/components/dashboard/new-patient-modal';
import { NewEvolutionModal } from '@/components/dashboard/new-evolution-modal';

const stats = [
  { label: 'Consultas Hoje', value: '12', icon: Calendar, change: '+3 vs ontem', color: 'bg-[#406B5B]' },
  { label: 'Pacientes Ativos', value: '248', icon: Users, change: '+12 este mes', color: 'bg-[#91AE9E]' },
  { label: 'Confirmadas', value: '9', icon: CheckCircle2, change: '75%', color: 'bg-[#B89D83]' },
  { label: 'Pendentes', value: '3', icon: Clock, change: 'Aguardando', color: 'bg-[#E4D5C3]' },
];

const todayAppointments = [
  { time: '08:00', patient: 'Maria Silva', type: 'Retorno', status: 'CONFIRMED' },
  { time: '08:30', patient: 'Joao Santos', type: 'Primeira Consulta', status: 'CONFIRMED' },
  { time: '09:00', patient: 'Ana Oliveira', type: 'Exames', status: 'SCHEDULED' },
  { time: '09:30', patient: 'Carlos Mendes', type: 'Retorno', status: 'CONFIRMED' },
  { time: '10:00', patient: 'Lucia Ferreira', type: 'Rotina', status: 'SCHEDULED' },
  { time: '10:30', patient: 'Pedro Costa', type: 'Urgencia', status: 'CONFIRMED' },
];

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-[#91AE9E] text-white',
  SCHEDULED: 'bg-[#E4D5C3] text-[#406B5B]',
  CANCELED: 'bg-red-100 text-red-700',
  NO_SHOW: 'bg-gray-100 text-gray-700',
};

const statusLabels: Record<string, string> = {
  CONFIRMED: 'Confirmado',
  SCHEDULED: 'Agendado',
  CANCELED: 'Cancelado',
  NO_SHOW: 'Faltou',
};

export default function DashboardPage() {
  const [openAppointment, setOpenAppointment] = useState(false);
  const [openPatient, setOpenPatient] = useState(false);
  const [openEvolution, setOpenEvolution] = useState(false);

  return (
    <div>
      <Header title="Dashboard" subtitle="Visao geral do seu consultorio" />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[#E4D5C3]/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#406B5B]/60 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#406B5B] mt-2">{stat.value}</p>
                  <p className="text-xs text-[#91AE9E] mt-1 font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <SalesLineChart />
          <TopProductsChart />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4D5C3]/50 shadow-sm">
            <div className="p-6 border-b border-[#E4D5C3]/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-semibold text-[#406B5B]">
                  Consultas de Hoje
                </h2>
                <a
                  href="/agenda"
                  className="text-sm text-[#91AE9E] hover:text-[#406B5B] font-medium transition-colors"
                >
                  Ver agenda completa
                </a>
              </div>
            </div>
            <div className="divide-y divide-[#E4D5C3]/30">
              {todayAppointments.map((apt, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-center justify-between hover:bg-[#E4D5C3]/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-semibold text-[#406B5B] w-14">
                      {apt.time}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#406B5B]">{apt.patient}</p>
                      <p className="text-xs text-[#406B5B]/50">{apt.type}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}
                  >
                    {statusLabels[apt.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E4D5C3]/50 shadow-sm">
              <h2 className="text-lg font-heading font-semibold text-[#406B5B] mb-4">
                Acoes Rapidas
              </h2>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setOpenAppointment(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#406B5B]/5 hover:bg-[#406B5B]/10 transition-colors group text-left"
                >
                  <Calendar className="w-5 h-5 text-[#406B5B] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-[#406B5B]">Nova Consulta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenPatient(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#91AE9E]/10 hover:bg-[#91AE9E]/20 transition-colors group text-left"
                >
                  <Users className="w-5 h-5 text-[#406B5B] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-[#406B5B]">Novo Paciente</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenEvolution(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#B89D83]/10 hover:bg-[#B89D83]/20 transition-colors group text-left"
                >
                  <TrendingUp className="w-5 h-5 text-[#406B5B] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-[#406B5B]">Nova Evolucao</span>
                </button>
              </div>
            </div>

            <div className="bg-[#91AE9E]/10 rounded-2xl p-6 border border-[#91AE9E]/30">
              <h2 className="text-lg font-heading font-semibold text-[#406B5B] mb-4">Lembretes</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#B89D83] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#406B5B]">3 pacientes sem retorno ha 90 dias</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-[#91AE9E] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#406B5B]">5 aniversariantes esta semana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewAppointmentModal open={openAppointment} onClose={() => setOpenAppointment(false)} />
      <NewPatientModal open={openPatient} onClose={() => setOpenPatient(false)} />
      <NewEvolutionModal open={openEvolution} onClose={() => setOpenEvolution(false)} />
    </div>
  );
}
