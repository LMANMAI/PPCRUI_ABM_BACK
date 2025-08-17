import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { CentersGatewayController } from './centers.gateway.controller';
import { CentersRequestsGatewayController } from './centers.requests.gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CENTERS_MS',
        transport: Transport.TCP,
        options: {
          host: process.env.CENTERS_MS_HOST || '127.0.0.1',
          port: Number(process.env.CENTERS_MS_PORT) || 4010,
        },
      },
    ]),
  ],
  controllers: [CentersRequestsGatewayController, CentersGatewayController],
})
export class CentersGatewayModule {}
