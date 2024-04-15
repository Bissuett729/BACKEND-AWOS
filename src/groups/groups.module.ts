import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/shared/gateway/gateway';
import { config } from 'dotenv';
import { GroupsController } from './controllers/groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema, Groups } from './schemas/groups.schema';
import { GroupsService } from './services/groups.service';

config();

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Groups.name,
        schema: GroupSchema,
      },
    ]),
  ],
  providers: [EventsGateway, GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
