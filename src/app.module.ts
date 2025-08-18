import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CentersGatewayModule } from './centers/centers.gateway.module';
import { AuthGatewayModule } from './auth/auth.gateway.module';
import { AppointmentsGatewayModule } from './appointments/appointments.gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CentersGatewayModule,
    AuthGatewayModule,
    AppointmentsGatewayModule,
  ],
})
export class AppModule {}
