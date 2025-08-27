import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
  Matches,
  IsPositive,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SlotStatusDto {
  FREE = 'FREE',
  BOOKED = 'BOOKED',
}

export class CreateSlotDto {
  @ApiProperty() @Type(() => Number) @IsInt() centerId!: number;
  @ApiProperty() @IsString() staffUserId!: string;

  // SINGLE
  @ApiPropertyOptional({ example: '2025-09-01T12:00:00.000Z' })
  @ValidateIf((o) => o.startAt != null || o.endAt != null)
  @IsISO8601()
  startAt?: string;

  @ApiPropertyOptional({ example: '2025-09-01T12:30:00.000Z' })
  @ValidateIf((o) => o.startAt != null || o.endAt != null)
  @IsISO8601()
  endAt?: string;

  // BULK
  @ApiPropertyOptional({ example: '2025-09-01' })
  @ValidateIf((o) => !o.startAt && !o.endAt)
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  startDate?: string;

  @ApiPropertyOptional({ example: '12:00' })
  @ValidateIf((o) => !o.startAt && !o.endAt)
  @Matches(/^\d{2}:\d{2}$/)
  workStartTime?: string;

  @ApiPropertyOptional({ example: '16:00' })
  @ValidateIf((o) => !o.startAt && !o.endAt)
  @Matches(/^\d{2}:\d{2}$/)
  workEndTime?: string;

  @ApiPropertyOptional({ example: 30 })
  @ValidateIf((o) => !o.startAt && !o.endAt)
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  slotDurationMin?: number;

  @ApiPropertyOptional({ example: 7 })
  @ValidateIf((o) => !o.startAt && !o.endAt)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  days?: number;
}

export class ListSlotsDto {
  @ApiPropertyOptional() @IsOptional() @IsString() centerId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() staffUserId?: string;
  @ApiPropertyOptional({ enum: SlotStatusDto })
  @IsOptional()
  @IsEnum(SlotStatusDto)
  status?: SlotStatusDto;
  @ApiPropertyOptional() @IsOptional() @IsISO8601() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsISO8601() dateTo?: string;
}
