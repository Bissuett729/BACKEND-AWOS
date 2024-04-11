import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { toolcolor } from './common/global/color.tool';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });

  const config = new DocumentBuilder()
  .setTitle('SWAGGER API AcademiCloud')
  .setDescription("API's for AcademiCloud")
  .setVersion('0.0.1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);


  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} MODE               ${toolcolor.reset}: ${toolcolor.green} Dev ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} IP RUNNING         ${toolcolor.reset}: ${toolcolor.red} localhost ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} PATH               ${toolcolor.reset}: ${toolcolor.green} /api ${toolcolor.reset}` ); 
  console.log(`${toolcolor.yellow}* ${toolcolor.cyan} SWAGGER NAME   ${toolcolor.reset}    : ${toolcolor.magenta} http://localhost:3000/api ${toolcolor.reset}` );  
  console.log(`${toolcolor.yellow}******************************************************${toolcolor.reset}`);
}
bootstrap();
