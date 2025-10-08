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
  ConfirmAppointmentDto,
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
  create(@Body() dto: CreateAppointmentDto) {
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_Create, dto).pipe(timeout(8000)),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar turnos' })
  list(@Query() q: ListAppointmentsDto) {
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_List, q).pipe(timeout(8000)),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener turno por ID' })
  getById(@Param('id') id: string, @Query('orgId') orgId: string) {
    return lastValueFrom(
      this.client
        .send(PATTERN.Appointments_GetById, { id, orgId })
        .pipe(timeout(8000)),
    );
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancelar turno' })
  @ApiBody({ type: CancelAppointmentDto })
  cancel(
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

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirmar turno' })
  @ApiBody({ type: ConfirmAppointmentDto })
  confirm(@Param('id') id: string, @Body() body: { orgId: string }) {
    const dto: ConfirmAppointmentDto = { id, orgId: body.orgId };
    return lastValueFrom(
      this.client.send(PATTERN.Appointments_Confirm, dto).pipe(timeout(8000)),
    );
  }
}
