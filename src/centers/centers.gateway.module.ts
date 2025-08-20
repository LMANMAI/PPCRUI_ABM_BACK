import { CentersGatewayController } from './centers.gateway.controller';
import { CentersRequestsGatewayController } from './centers.requests.gateway.controller';
import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  ClientProviderOptions,
} from '@nestjs/microservices';

const MS_TRANSPORT = process.env.MS_TRANSPORT ?? 'TCP';
const useTcp = MS_TRANSPORT === 'TCP';

const host = process.env.CENTERS_HOST ?? 'centers';
const port = Number(process.env.CENTERS_PORT ?? 4030);

const CENTERS_CLIENT_TCP: ClientProviderOptions = {
  name: 'CENTERS_MS',
  transport: Transport.TCP,
  options: { host, port },
};

const CENTERS_CLIENT_RMQ: ClientProviderOptions = {
  name: 'CENTERS_MS',
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
    queue: 'centers_queue',
    queueOptions: { durable: true },
  },
};

@Module({
  imports: [
    ClientsModule.register([useTcp ? CENTERS_CLIENT_TCP : CENTERS_CLIENT_RMQ]),
  ],
  controllers: [CentersRequestsGatewayController, CentersGatewayController],
})
export class CentersGatewayModule {}
