import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/shared/gateway/gateway';
import { config } from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './services/notes/notes.service';
import { NotesController } from './controllers/notes.controller';
import { Notes, Noteschema } from './schemas/notes.schema';

config();

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notes.name,
        schema: Noteschema,
      },
    ]),
  ],
  providers: [EventsGateway, NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
