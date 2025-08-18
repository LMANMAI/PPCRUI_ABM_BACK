import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RequestDeleteCenterDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  centerId!: number;

  @ApiPropertyOptional({ example: 'Cierre por reformas' })
  @IsOptional()
  @IsString()
  reason?: string;
}
