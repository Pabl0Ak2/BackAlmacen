import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS específicamente para tu frontend
  app.enableCors({
    origin: 'http://localhost:3001',  // Permite solicitudes solo desde localhost:3001
    methods: 'GET,POST,PUT,DELETE',  // Permitir los métodos HTTP necesarios
    allowedHeaders: 'Content-Type, Accept',  // Permite los encabezados necesarios
  });

  await app.listen(3000);
}
bootstrap();
