import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsISO8601, IsEnum } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty() @IsString() orgId!: string;
  @ApiProperty() @IsString() slotId!: string;
  @ApiProperty() @IsString() patientUserId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class ListAppointmentsDto {
  @ApiProperty() @IsString() orgId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() centerId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() patientUserId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() staffUserId?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
  @ApiPropertyOptional() @IsOptional() @IsISO8601() dateFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsISO8601() dateTo?: string;
}

export class CancelAppointmentDto {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsString() orgId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}

export class ConfirmAppointmentDto {
  @ApiProperty() @IsString() id!: string;
  @ApiProperty() @IsString() orgId!: string;
}
