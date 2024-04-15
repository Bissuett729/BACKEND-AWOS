import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes/notes.controller';
import { NotesService } from './services/notes/notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
