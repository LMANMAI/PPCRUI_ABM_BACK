import { Module } from '@nestjs/common';
import { CentersGatewayModule } from './centers/centers.gateway.module';

@Module({
  imports: [CentersGatewayModule],
})
export class AppModule {}
