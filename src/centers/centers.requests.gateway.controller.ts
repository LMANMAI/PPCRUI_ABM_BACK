import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReviewRequestDto } from './dto/review-request.dto';

type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL';

@ApiTags('Centros de Salud - Solicitudes')
@Controller('centros-salud/solicitudes')
export class CentersRequestsGatewayController {
  constructor(@Inject('CENTERS_MS') private client: ClientProxy) {}

  @Get()
  @ApiOperation({
    operationId: 'listCenterRequests',
    summary: 'Listar solicitudes',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description:
      'Opcional: PENDING | APPROVED | REJECTED. Si lo omitís, trae todas.',
  })
  list(@Query('status') status?: string) {
    const s = status?.toUpperCase() as RequestStatus | undefined;
    const filter = !s || s === 'ALL' ? undefined : s;
    return this.client.send('centers.req.list', { status: filter });
  }

  @Post(':requestId/approve')
  @ApiOperation({
    operationId: 'approveCenterRequest',
    summary: 'Aprobar solicitud',
  })
  @ApiParam({ name: 'requestId', type: Number })
  approve(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Body() body: ReviewRequestDto,
  ) {
    return this.client.send('centers.req.approve', {
      requestId,
      reviewedBy: 'adminX',
      reviewNote: body?.note,
    });
  }

  @Post(':requestId/reject')
  @ApiOperation({
    operationId: 'rejectCenterRequest',
    summary: 'Rechazar solicitud',
  })
  @ApiParam({ name: 'requestId', type: Number })
  reject(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Body() body: ReviewRequestDto,
  ) {
    return this.client.send('centers.req.reject', {
      requestId,
      reviewedBy: 'adminX',
      reviewNote: body?.note,
    });
  }
}
