import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, timeout } from 'rxjs';
import { PATTERN } from '../patterns';
import {
  CreateAppointmentDto,
  ListAppointmentsDto,
  CancelAppointmentDto,
} from '../contracts-public/appointments.dto';

@ApiTags('Turnos')
@Controller('appointments')
export class AppointmentsHttpController {
  constructor(
    @Inject('APPOINTMENTS_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear turno' })
  @ApiBody({ type: CreateAppointmentDto })
  async create(@Body() dto: CreateAppointmentDto) {
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_Create, dto).pipe(timeout(8000)),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar turnos' })
  @ApiQuery({ name: 'orgId', required: true })
  @ApiQuery({ name: 'centerId', required: false })
  @ApiQuery({ name: 'patientUserId', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  async list(@Query() q: ListAppointmentsDto) {
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_List, q).pipe(timeout(8000)),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener turno por ID' })
  async getById(@Param('id') id: string, @Query('orgId') orgId: string) {
    return lastValueFrom(
      this.client
        .send(PATTERN.Appointments_GetById, { id, orgId })
        .pipe(timeout(8000)),
    );
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancelar turno' })
  @ApiBody({ type: CancelAppointmentDto })
  async cancel(
    @Param('id') id: string,
    @Body() body: { orgId: string; reason?: string },
  ) {
    const dto: CancelAppointmentDto = {
      id,
      orgId: body.orgId,
      reason: body.reason,
    };
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_Cancel, dto).pipe(timeout(8000)),
    );
  }
}
