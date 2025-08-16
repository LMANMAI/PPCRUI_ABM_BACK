import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'c3f9b7f2-2a4a-4fbb-9b21-1b3c7bda2e28' })
  @IsString()
  @IsNotEmpty()
  centerId: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @ApiProperty({ example: '2025-08-16T14:30:00.000Z' })
  @IsISO8601()
  @IsNotEmpty()
  date: string;
}

export class AppointmentDto {
  @ApiProperty() id: string;
  @ApiProperty() centerId: string;
  @ApiProperty() patientName: string;
  @ApiProperty() date: string;
}
