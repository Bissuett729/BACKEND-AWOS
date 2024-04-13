/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventsGateway } from './gateway/gateway';

@Module({
  providers: [
    EventsGateway,
  ],
  exports:[
    EventsGateway
  ]
})
export class ShareModule {}
