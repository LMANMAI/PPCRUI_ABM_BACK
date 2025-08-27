import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  ValidateIf,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum ProfileTypeDto {
  PATIENT = 'PATIENT',
  CENTER_ADMIN = 'CENTER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  OPERADOR_SALUD = 'OPERADOR_SALUD',
  PERSONAL_SALUD = 'PERSONAL_SALUD',
}
export class RegisterRequestDto {
  @ApiProperty({ example: 'user@demo.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'org-1' })
  @IsString()
  orgId!: string;

  @ApiProperty({ enum: ProfileTypeDto })
  @IsEnum(ProfileTypeDto)
  profileType!: ProfileTypeDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'DNI', example: '34876543' })
  @IsString()
  document!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  staffFullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  centerId?: string;
}

export class LoginRequestDto {
  @ApiProperty({ example: 'maria.rios@example.com o 34876543' })
  @IsString()
  identifier!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
