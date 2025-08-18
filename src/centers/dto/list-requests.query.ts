import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum RequestStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class ListRequestsQueryDto {
  @ApiPropertyOptional({ enum: RequestStatusEnum })
  @IsOptional()
  @IsEnum(RequestStatusEnum)
  status?: RequestStatusEnum;
}
