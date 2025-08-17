import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReviewRequestDto {
  @ApiPropertyOptional({ example: 'OK' })
  @IsOptional()
  @IsString()
  note?: string;
}
