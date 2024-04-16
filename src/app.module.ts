import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
// import { GroupsModule } from './groups/groups.module';
// import { NotesModule } from './notes/notes.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

config();

@Module({
    // imports:[
    //     MongooseModule.forRoot(process.env.URI),
    //     UsersModule,
    //     GroupsModule,
    //     NotesModule
    // ],
    controllers: [AppController],
    providers: [AppService]
})


export class AppModule {}
