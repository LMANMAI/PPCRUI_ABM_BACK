import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateAppointmentDto,
  AppointmentDto,
} from '../contracts-public/appointments.dto';
import { PATTERN } from '../patterns';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject('APPOINTMENTS_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'GetAppointments: lista todos los turnos' })
  @ApiResponse({ status: 200, type: [AppointmentDto] })
  async GetAppointments(): Promise<AppointmentDto[]> {
    return await lastValueFrom(
      this.client
        .send(PATTERN.Appointments_GetAppointments, {})
        .pipe(timeout(5000)),
    );
  }

  @Post()
  @ApiOperation({ summary: 'CreateAppointment: crea un turno' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, type: AppointmentDto })
  async CreateAppointment(
    @Body() dto: CreateAppointmentDto,
  ): Promise<AppointmentDto> {
    return await lastValueFrom(
      this.client
        .send(PATTERN.Appointments_CreateAppointment, dto)
        .pipe(timeout(5000)),
    );
  }
}
