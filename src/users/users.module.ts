import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Users, UserSchema} from './schemas/users.schema'
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Users.name,
            schema: UserSchema
        }])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
