import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from 'src/shared/gateway/gateway';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [UsersService, AuthService, EventsGateway],
  controllers: [UsersController, AuthController],
})
export class UsersModule {}

