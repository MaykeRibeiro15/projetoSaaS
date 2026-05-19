import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateAppointmentDto) {
    // Check for conflicts
    const conflict = await this.prisma.appointment.findFirst({
      where: {
        tenantId,
        doctorId: dto.doctorId,
        dateTime: new Date(dto.dateTime),
        status: { notIn: ['CANCELED'] },
      },
    });

    if (conflict) {
      throw new BadRequestException('Horário já ocupado');
    }

    return this.prisma.appointment.create({
      data: {
        tenantId,
        doctorId: dto.doctorId,
        patientId: dto.patientId,
        dateTime: new Date(dto.dateTime),
        duration: dto.duration || 30,
        type: dto.type,
        notes: dto.notes,
      },
      include: { patient: true, doctor: { include: { user: true } } },
    });
  }

  async findAll(tenantId: string, filters: { doctorId?: string; date?: string; status?: string; page?: number; limit?: number }) {
    const { doctorId, date, status, page = 1, limit = 50 } = filters;
    const skip = (page - 1) * limit;
    const where: any = { tenantId, deletedAt: null };

    if (doctorId) where.doctorId = doctorId;
    if (status) where.status = status;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.dateTime = { gte: start, lte: end };
    }

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateTime: 'asc' },
        include: {
          patient: { select: { id: true, name: true, phone: true } },
          doctor: { include: { user: { select: { name: true } } } },
        },
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return { data: appointments, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async updateStatus(id: string, tenantId: string, status: AppointmentStatus) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, tenantId },
    });
    if (!appointment) throw new NotFoundException('Consulta não encontrada');

    const updateData: any = { status };
    if (status === 'CONFIRMED') updateData.confirmedAt = new Date();
    if (status === 'COMPLETED') updateData.completedAt = new Date();

    return this.prisma.appointment.update({
      where: { id },
      data: updateData,
    });
  }

  async cancel(id: string, tenantId: string, reason?: string) {
    return this.updateStatus(id, tenantId, 'CANCELED');
  }
}
