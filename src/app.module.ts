import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
    imports:[
        MongooseModule.forRoot(process.env.URI)
        ,UsersModule
    ]
})


export class AppModule {}
