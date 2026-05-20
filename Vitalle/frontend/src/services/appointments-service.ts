import { supabase } from '@/lib/supabase';

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'CANCELED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'NO_SHOW';

export interface AppointmentRow {
  id: string;
  tenant_id: string;
  doctor_id: string;
  patient_id: string;
  date_time: string;
  duration: number;
  status: AppointmentStatus;
  type: string | null;
  notes: string | null;
  patients?: { id: string; name: string } | null;
}

export interface CreateAppointmentPayload {
  tenantId: string;
  doctorId: string;
  patientName: string;
  dateTimeIso: string;
  duration: number;
  type: string;
  notes?: string;
}

/**
 * Garante que existe um paciente com o nome informado no tenant.
 * Para o MVP single-user usamos só o nome — quando o backend
 * estiver ligado, a criação de paciente vira fluxo dedicado.
 */
async function ensurePatient(tenantId: string, patientName: string): Promise<string> {
  const trimmed = patientName.trim();
  const existing = await supabase
    .from('patients')
    .select('id')
    .eq('tenant_id', tenantId)
    .ilike('name', trimmed)
    .limit(1)
    .maybeSingle();
  if (existing.data?.id) return existing.data.id;

  // Cria paciente novo com CPF placeholder (único por tenant).
  const placeholderCpf = `MVP-${Date.now()}`;
  const insert = await supabase
    .from('patients')
    .insert({
      tenant_id: tenantId,
      name: trimmed,
      cpf: placeholderCpf,
      phone: 'N/A',
    })
    .select('id')
    .single();
  if (insert.error || !insert.data) {
    throw new Error(insert.error?.message || 'Falha ao criar paciente.');
  }
  return insert.data.id;
}

async function resolveDoctorId(tenantId: string): Promise<string> {
  const { data, error } = await supabase
    .from('doctors')
    .select('id')
    .eq('tenant_id', tenantId)
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Nenhum médico cadastrado para este tenant.');
  return data.id;
}

export async function createAppointment(payload: CreateAppointmentPayload): Promise<AppointmentRow> {
  const patientId = await ensurePatient(payload.tenantId, payload.patientName);

  const insert = await supabase
    .from('appointments')
    .insert({
      tenant_id: payload.tenantId,
      doctor_id: payload.doctorId,
      patient_id: patientId,
      date_time: payload.dateTimeIso,
      duration: payload.duration,
      type: payload.type,
      notes: payload.notes || null,
      status: 'SCHEDULED' as AppointmentStatus,
    })
    .select('*, patients ( id, name )')
    .single();

  if (insert.error || !insert.data) {
    throw new Error(insert.error?.message || 'Falha ao criar consulta.');
  }
  return insert.data as AppointmentRow;
}

export async function listAppointmentsInRange(
  tenantId: string,
  startIso: string,
  endIso: string,
): Promise<AppointmentRow[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patients ( id, name )')
    .eq('tenant_id', tenantId)
    .gte('date_time', startIso)
    .lt('date_time', endIso)
    .order('date_time', { ascending: true });
  if (error) throw new Error(error.message);
  return (data || []) as AppointmentRow[];
}

export { resolveDoctorId };
