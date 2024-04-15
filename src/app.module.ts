import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { GroupsModule } from './groups/groups.module';
import { NotesModule } from './notes/notes.module';

config();

@Module({
    imports:[
        MongooseModule.forRoot(process.env.URI),
        UsersModule,
        GroupsModule,
        NotesModule
    ]
})


export class AppModule {}
