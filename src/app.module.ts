import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

config(); // Carga las variables de entorno desde el archivo .env

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

