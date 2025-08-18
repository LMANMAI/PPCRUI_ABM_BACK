import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  ClientProviderOptions,
} from '@nestjs/microservices';
import { AuthHttpController } from './auth.controller';

const useTcp = (process.env.MS_TRANSPORT ?? 'TCP') === 'TCP';

const AUTH_CLIENT_TCP: ClientProviderOptions = {
  name: 'AUTH_CLIENT',
  transport: Transport.TCP,
  options: {
    host: process.env.AUTH_HOST || '127.0.0.1',
    port: Number(process.env.AUTH_PORT || 4040),
  },
};

const AUTH_CLIENT_RMQ: ClientProviderOptions = {
  name: 'AUTH_CLIENT',
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
    queue: 'auth_queue',
    queueOptions: { durable: true },
  },
};

@Module({
  imports: [
    ClientsModule.register([useTcp ? AUTH_CLIENT_TCP : AUTH_CLIENT_RMQ]),
  ],
  controllers: [AuthHttpController],
})
export class AuthGatewayModule {}
