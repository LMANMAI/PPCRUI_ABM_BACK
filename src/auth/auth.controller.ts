import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: any) {
    return this.authService.signup(userData);
  }

  @Post('signin')
  async signin(@Body() credentials: any) {
    return this.authService.signIn(credentials.email, credentials.password);
  }
}
