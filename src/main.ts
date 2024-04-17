import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { toolcolor } from './common/global/color.tool';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,X-Requested-With,Accept-Language",
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Configurar límites de tamaño para las solicitudes JSON y URL-encoded
  app.use(bodyParser.json({ limit: '50mb' }));  // Aumenta según tus necesidades
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SWAGGER API AcademiCloud')
    .setDescription("API's for AcademiCloud")
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Escuchar en el puerto configurado
  await app.listen(3000);

  // Imprimir información de inicio
  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} MODE               ${toolcolor.reset}: ${toolcolor.green} Dev ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} IP RUNNING         ${toolcolor.reset}: ${toolcolor.red} localhost ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} PATH               ${toolcolor.reset}: ${toolcolor.green} /api ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} SWAGGER NAME       ${toolcolor.reset}: ${toolcolor.magenta} http://localhost:3000/api ${toolcolor.reset}` );  
  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
}
bootstrap();
