import { supabase } from '@/lib/supabase';

export interface PatientRow {
  id: string;
  tenant_id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string | null;
  date_of_birth: string | null;
  gender: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientPayload {
  tenantId: string;
  name: string;
  cpf: string;        // apenas dígitos
  phone: string;      // apenas dígitos
  email?: string | null;
  dateOfBirth?: string | null;  // 'yyyy-MM-dd' ou ISO
  gender?: string | null;
  address?: string | null;
}

/**
 * Cria um paciente real na tabela public.patients do Supabase.
 *
 * - CPF é único por tenant (constraint @@unique([cpf, tenantId])).
 * - Telefone, nome e CPF são obrigatórios no schema.
 * - Em caso de CPF duplicado (constraint 23505) a mensagem é
 *   traduzida para pt-BR.
 */
export async function createPatient(payload: CreatePatientPayload): Promise<PatientRow> {
  const insertPayload = {
    tenant_id: payload.tenantId,
    name: payload.name.trim(),
    cpf: payload.cpf,
    phone: payload.phone,
    email: payload.email?.trim() || null,
    date_of_birth: payload.dateOfBirth ? payload.dateOfBirth : null,
    gender: payload.gender || null,
    address: payload.address?.trim() || null,
    is_active: true,
  };

  const { data, error } = await supabase
    .from('patients')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error || !data) {
    const msg = error?.message || '';
    // Duplicidade de CPF (constraint @@unique([cpf, tenantId]))
    if (error?.code === '23505' || msg.toLowerCase().includes('duplicate')) {
      throw new Error('Já existe um paciente cadastrado com este CPF.');
    }
    throw new Error(error?.message || 'Falha ao cadastrar paciente.');
  }

  return data as PatientRow;
}

/**
 * Lista pacientes ativos do tenant (mais recentes primeiro).
 * Útil para futuras telas de listagem / autocompletar.
 */
export async function listPatients(tenantId: string, limit = 50): Promise<PatientRow[]> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('tenant_id', tenantId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data || []) as PatientRow[];
}
