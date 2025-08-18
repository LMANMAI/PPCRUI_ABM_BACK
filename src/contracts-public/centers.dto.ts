import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({ example: 'Centro de Salud N°1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Av. Mitre 1234' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Oeste' })
  @IsString()
  @IsNotEmpty()
  zone: string;
}

export class CenterDto {
  @ApiProperty({ example: 'c3f9b7f2-2a4a-4fbb-9b21-1b3c7bda2e28' })
  id: string;

  @ApiProperty() name: string;
  @ApiProperty() address: string;
  @ApiProperty() zone: string;
}
