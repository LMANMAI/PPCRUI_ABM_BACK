import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
export enum DocumentType {
  MUNICIPAL_HABILITATION = 'MUNICIPAL_HABILITATION',
  PLAN_APPROVED = 'PLAN_APPROVED',
  PROTOCOL = 'PROTOCOL',
  OTHER = 'OTHER',
}

export class CreateCenterDto {
  @ApiProperty() @IsString() @MaxLength(200) name!: string;
  @ApiProperty() @IsString() @MaxLength(250) address!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() zone?: string;
  @ApiPropertyOptional({ example: 6 }) @IsOptional() @IsInt() capacity?: number;
  @ApiPropertyOptional({ example: -34.612345 })
  @IsOptional()
  @IsNumber()
  latitude?: number;
  @ApiPropertyOptional({ example: -58.433221 })
  @IsOptional()
  @IsNumber()
  longitude?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional({ enum: DayOfWeek })
  @IsOptional()
  @IsEnum(DayOfWeek)
  startDay?: DayOfWeek;
  @ApiPropertyOptional({ enum: DayOfWeek })
  @IsOptional()
  @IsEnum(DayOfWeek)
  endDay?: DayOfWeek;
  @ApiPropertyOptional({ example: '08:00' })
  @IsOptional()
  @IsString()
  openTime?: string;
  @ApiPropertyOptional({ example: '18:00' })
  @IsOptional()
  @IsString()
  closeTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() respFullName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() respPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() respLicense?: string;
}
export class UpdateCenterDto extends PartialType(CreateCenterDto) {}

export class AddDocumentsDto {
  @ApiProperty({ enum: DocumentType }) type!: DocumentType;
  @ApiProperty() url!: string;
  @ApiPropertyOptional() filename?: string;
  @ApiPropertyOptional() mime?: string;
  @ApiPropertyOptional() size?: number;
}
