import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Query,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateCenterDto,
  UpdateCenterDto,
  AddDocumentsDto,
} from './dto/create-center.dto';
import { RequestDeleteCenterDto } from './dto/request-delete.dto';

@ApiTags('Centros de Salud')
@Controller('centros-salud')
export class CentersGatewayController {
  constructor(@Inject('CENTERS_MS') private client: ClientProxy) {}

  @Get()
  @ApiOperation({
    operationId: 'listHealthCenters',
    summary: 'Listar centros (solo activos por defecto)',
  })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  list(@Query('includeInactive') includeInactive?: string) {
    const flag = includeInactive === 'true' || includeInactive === '1';
    return this.client.send('centers.list', { includeInactive: flag });
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getHealthCenter',
    summary: 'Obtener centro por ID',
  })
  @ApiParam({ name: 'id', type: Number })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('centers.get', id);
  }

  @Post()
  @ApiOperation({
    operationId: 'requestCreateHealthCenter',
    summary: 'Crear SOLICITUD de alta',
  })
  @ApiBody({ type: CreateCenterDto })
  requestCreate(@Body() dto: CreateCenterDto) {
    return this.client.send('centers.req.create', {
      payload: dto,
      createdBy: 'userX',
    });
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'requestUpdateHealthCenter',
    summary: 'Crear SOLICITUD de edición',
  })
  @ApiBody({ type: UpdateCenterDto })
  requestUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCenterDto,
  ) {
    return this.client.send('centers.req.update', {
      centerId: id,
      payload: dto,
      createdBy: 'userX',
    });
  }

  @Post('delete')
  @ApiOperation({
    operationId: 'requestDeleteHealthCenter',
    summary: 'Crear SOLICITUD de baja (soft delete al aprobar)',
  })
  @ApiBody({ type: RequestDeleteCenterDto })
  requestDelete(@Body() dto: RequestDeleteCenterDto) {
    return this.client.send('centers.req.delete', {
      centerId: dto.centerId,
      reason: dto.reason,
      createdBy: 'userX',
    });
  }

  @Post(':id/documents')
  @ApiOperation({
    operationId: 'addHealthCenterDocuments',
    summary: 'Agregar documentos (metadatos)',
  })
  @ApiBody({ type: [AddDocumentsDto] })
  addDocs(
    @Param('id', ParseIntPipe) id: number,
    @Body() docs: AddDocumentsDto[],
  ) {
    return this.client.send('centers.docs.add', { id, docs });
  }
}
