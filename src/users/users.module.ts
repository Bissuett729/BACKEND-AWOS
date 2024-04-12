import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Users, UserSchema} from './schemas/users.schema'
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/authentication.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Users.name,
            schema: UserSchema
        }])
    ],
    providers: [UsersService, AuthService],
    controllers: [UsersController, AuthController]
})
export class UsersModule {}
