import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { HttpException } from '@nestjs/common';
import { PATTERN } from '../patterns';
import { CreateSlotDto, ListSlotsDto } from '../contracts-public/slots.dto';

@ApiTags('Slots')
@Controller('slots')
export class SlotsGetawayController {
  constructor(
    @Inject('APPOINTMENTS_CLIENT') private readonly appt: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear slot' })
  @ApiBody({ type: CreateSlotDto })
  create(@Body() dto: CreateSlotDto) {
    return lastValueFrom(
      this.appt.send(PATTERN.Appointments_Slots_Create, dto).pipe(
        timeout(15000),
        catchError((err) => {
          const r = err && err.response ? err.response : err;

          const status =
            (typeof r?.statusCode === 'number' && r.statusCode) ||
            (typeof err?.statusCode === 'number' && err.statusCode) ||
            (typeof r?.status === 'number' && r.status) ||
            502;

          const message =
            (typeof r?.message === 'string' && r.message) ||
            (typeof err?.message === 'string' && err.message) ||
            'Upstream error';

          console.error('[slots.create] upstream error normalized:', {
            status,
            message,
            raw: r,
          });

          throw new HttpException(
            { error: 'UPSTREAM_ERROR', message, details: r },
            status,
          );
        }),
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar slots' })
  list(@Query() q: ListSlotsDto) {
    return lastValueFrom(
      this.appt.send(PATTERN.Appointments_Slots_List, q).pipe(
        timeout(15000),
        catchError((err) => {
          const r = err?.response ?? err;
          const status =
            (typeof r?.statusCode === 'number' && r.statusCode) ||
            (typeof err?.statusCode === 'number' && err.statusCode) ||
            (typeof r?.status === 'number' && r.status) ||
            502;
          const message =
            (typeof r?.message === 'string' && r.message) ||
            (typeof err?.message === 'string' && err.message) ||
            'Upstream error';
          throw new HttpException(
            { error: 'UPSTREAM_ERROR', message, details: r },
            status,
          );
        }),
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener slot por ID' })
  getById(@Param('id') id: string) {
    return lastValueFrom(
      this.appt.send(PATTERN.Appointments_Slots_GetById, { id }).pipe(
        timeout(15000),
        catchError((err) => {
          const r = err?.response ?? err;
          const status =
            (typeof r?.statusCode === 'number' && r.statusCode) ||
            (typeof err?.statusCode === 'number' && err.statusCode) ||
            (typeof r?.status === 'number' && r.status) ||
            502;
          const message =
            (typeof r?.message === 'string' && r.message) ||
            (typeof err?.message === 'string' && err.message) ||
            'Upstream error';
          throw new HttpException(
            { error: 'UPSTREAM_ERROR', message, details: r },
            status,
          );
        }),
      ),
    );
  }
}
