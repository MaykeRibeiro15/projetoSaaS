'use client';

import { Header } from '@/components/layout/header';
import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MoreVertical,
  FileText,
  Calendar,
  Eye,
} from 'lucide-react';
import { formatCPF, formatPhone } from '@/lib/utils';

const mockPatients = [
  { id: '1', name: 'Maria Silva Santos', cpf: '12345678901', phone: '11987654321', email: 'maria@email.com', lastVisit: '2024-03-15', totalVisits: 12, status: 'active' },
  { id: '2', name: 'João Pedro Oliveira', cpf: '23456789012', phone: '11976543210', email: 'joao@email.com', lastVisit: '2024-03-10', totalVisits: 5, status: 'active' },
  { id: '3', name: 'Ana Carolina Ferreira', cpf: '34567890123', phone: '11965432109', email: 'ana@email.com', lastVisit: '2024-02-28', totalVisits: 8, status: 'active' },
  { id: '4', name: 'Carlos Eduardo Lima', cpf: '45678901234', phone: '11954321098', email: 'carlos@email.com', lastVisit: '2024-01-20', totalVisits: 3, status: 'inactive' },
  { id: '5', name: 'Lucia Helena Costa', cpf: '56789012345', phone: '11943210987', email: 'lucia@email.com', lastVisit: '2024-03-18', totalVisits: 15, status: 'active' },
  { id: '6', name: 'Pedro Henrique Souza', cpf: '67890123456', phone: '11932109876', email: 'pedro@email.com', lastVisit: '2024-03-01', totalVisits: 7, status: 'active' },
];

export default function PacientesPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cpf.includes(search) ||
    p.phone.includes(search)
  );

  return (
    <div>
      <Header title="Pacientes" subtitle="Gerencie seus pacientes" />
      
      <div className="p-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E4D5C3] text-[#406B5B] rounded-xl hover:bg-[#E4D5C3]/20 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#406B5B] text-white rounded-xl hover:bg-[#406B5B]/90 transition-colors text-sm font-medium shadow-sm">
              <Plus className="w-4 h-4" />
              Novo Paciente
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-[#E4D5C3]/50">
            <p className="text-sm text-[#406B5B]/60">Total de Pacientes</p>
            <p className="text-2xl font-bold text-[#406B5B] mt-1">248</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E4D5C3]/50">
            <p className="text-sm text-[#406B5B]/60">Novos este mês</p>
            <p className="text-2xl font-bold text-[#91AE9E] mt-1">12</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E4D5C3]/50">
            <p className="text-sm text-[#406B5B]/60">Aniversariantes</p>
            <p className="text-2xl font-bold text-[#B89D83] mt-1">5</p>
          </div>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-2xl p-6 border border-[#E4D5C3]/50 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#91AE9E]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#406B5B] font-semibold">
                      {patient.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#406B5B] group-hover:text-[#406B5B]">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-[#406B5B]/50">
                      CPF: {formatCPF(patient.cpf)}
                    </p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[#E4D5C3]/30 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4 text-[#406B5B]/50" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#406B5B]/60">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{formatPhone(patient.phone)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#406B5B]/60">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#406B5B]/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4D5C3]/30">
                <span className="text-xs text-[#406B5B]/50">{patient.totalVisits} consultas</span>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-[#91AE9E]/10 transition-colors" title="Ver prontuário">
                    <FileText className="w-4 h-4 text-[#406B5B]/60" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#91AE9E]/10 transition-colors" title="Ver detalhes">
                    <Eye className="w-4 h-4 text-[#406B5B]/60" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
