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
import { CreateCenterDto, CenterDto } from '../contracts-public/centers.dto';

const PATTERN = {
  Centers_GetCenters: 'Centers.GetCenters',
  Centers_CreateCenter: 'Centers.CreateCenter',
} as const;

@ApiTags('Centers')
@ApiBearerAuth()
@Controller('centers')
export class CentersController {
  constructor(
    @Inject('CENTERS_CLIENT') private readonly centersClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'GetCenters: lista todos los centros' })
  @ApiResponse({ status: 200, type: [CenterDto] })
  async GetCenters(): Promise<CenterDto[]> {
    const obs$ = this.centersClient
      .send(PATTERN.Centers_GetCenters, {})
      .pipe(timeout(5000));
    return await lastValueFrom(obs$);
  }

  @Post()
  @ApiOperation({ summary: 'CreateCenter: crea un nuevo centro' })
  @ApiBody({ type: CreateCenterDto })
  @ApiResponse({ status: 201, type: CenterDto })
  async CreateCenter(@Body() dto: CreateCenterDto): Promise<CenterDto> {
    const obs$ = this.centersClient
      .send(PATTERN.Centers_CreateCenter, dto)
      .pipe(timeout(5000));
    return await lastValueFrom(obs$);
  }
}
