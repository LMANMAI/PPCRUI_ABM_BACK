import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CentersGatewayModule } from './centers/centers.gateway.module';
import { AuthGatewayModule } from './auth/auth.gateway.module';
import { AppointmentsGatewayModule } from './appointments/appointments.gateway.module';

const ENV = process.env.APP_ENV ?? process.env.NODE_ENV ?? 'development';
const isProd = (process.env.NODE_ENV ?? '').toLowerCase() === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isProd
        ? undefined
        : [`.env.${ENV}.local`, `.env.${ENV}`, '.env'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        MS_TRANSPORT: Joi.string().valid('TCP', 'RMQ').default('TCP'),

        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),

        CENTERS_HOST: Joi.string().required(),
        CENTERS_PORT: Joi.number().required(),

        APPOINTMENTS_HOST: Joi.string().required(),
        APPOINTMENTS_PORT: Joi.number().required(),

        RABBITMQ_URL: Joi.string().optional(),
      }),
    }),
    CentersGatewayModule,
    AuthGatewayModule,
    AppointmentsGatewayModule,
  ],
})
export class AppModule {}
