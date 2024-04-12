import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { GroupsController } from './groups/controllers/groups/groups.controller';

config(); // Carga las variables de entorno desde el archivo .env

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI),
    UsersModule,
  ],
  controllers: [AppController, GroupsController],
  providers: [AppService],
})
export class AppModule {}

