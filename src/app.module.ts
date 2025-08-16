import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CentersController } from './controllers/centers.controller';
import { AppointmentsController } from './controllers/appointments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CENTERS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'centers_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: 'APPOINTMENTS_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'appointments_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [CentersController, AppointmentsController],
})
export class AppModule {}
