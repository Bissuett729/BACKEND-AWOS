import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('SWAGGER API AcademiCloud')
  .setDescription("API's for AcademiCloud")
  .setVersion('0.0.1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  app.enableCors();
  await app.listen(3000);
}
bootstrap();
