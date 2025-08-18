import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  ClientProviderOptions,
} from '@nestjs/microservices';
import { AppointmentsHttpController } from './appointments.http.controller';

const useTcp = (process.env.MS_TRANSPORT ?? 'TCP') === 'TCP';

const APPOINTMENTS_CLIENT_TCP: ClientProviderOptions = {
  name: 'APPOINTMENTS_CLIENT',
  transport: Transport.TCP,
  options: {
    host: process.env.APPOINTMENTS_HOST || '127.0.0.1',
    port: Number(process.env.APPOINTMENTS_PORT || 4050),
  },
};

const APPOINTMENTS_CLIENT_RMQ: ClientProviderOptions = {
  name: 'APPOINTMENTS_CLIENT',
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@127.0.0.1:5672'],
    queue: 'appointments_queue',
    queueOptions: { durable: true },
  },
};

@Module({
  imports: [
    ClientsModule.register([
      useTcp ? APPOINTMENTS_CLIENT_TCP : APPOINTMENTS_CLIENT_RMQ,
    ]),
  ],
  controllers: [AppointmentsHttpController],
})
export class AppointmentsGatewayModule {}
