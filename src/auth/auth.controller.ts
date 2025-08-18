import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom, timeout } from 'rxjs';
import { PATTERN } from '../patterns';
import {
  LoginRequestDto,
  RegisterRequestDto,
} from '../contracts-public/auth.dto';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthHttpController {
  constructor(@Inject('AUTH_CLIENT') private readonly auth: ClientProxy) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({ type: RegisterRequestDto })
  async register(@Body() dto: RegisterRequestDto) {
    return lastValueFrom(
      this.auth.send(PATTERN.Auth_Register, dto).pipe(timeout(10000)),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginRequestDto })
  async login(@Body() dto: LoginRequestDto) {
    return lastValueFrom(
      this.auth.send(PATTERN.Auth_Login, dto).pipe(timeout(8000)),
    );
  }
}
