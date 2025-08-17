import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('PPCRUI ABM – API Gateway')
    .setDescription('Contrato público para centros y turnos')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  // deepScanRoutes ayuda cuando los controllers están en módulos anidados
  const doc = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, doc, {
    swaggerOptions: { displayOperationId: true },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
