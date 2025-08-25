import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  ValidateIf,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum ProfileType {
  PATIENT = 'PATIENT',
  CENTER_ADMIN = 'CENTER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
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

  @ApiProperty({ enum: ProfileType })
  @IsEnum(ProfileType)
  profileType!: ProfileType;

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
  @ApiProperty({ example: 'org-1' })
  @IsString()
  orgId!: string;

  @ApiPropertyOptional({
    description: 'Email o DNI',
    examples: ['user@demo.com', '34876543'],
  })
  @ValidateIf((o) => !o.email)
  @IsString()
  identifier?: string;

  @ApiPropertyOptional({ example: 'user@demo.com' })
  @ValidateIf((o) => !o.identifier)
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
