import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Administrator:oTBEjyaYUTdMRIDD@academiccloud.0jeeivf.mongodb.net/?retryWrites=true&w=majority&appName=AcademicCloud'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
