import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Users, UserSchema} from './schemas/users.schema'
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/authentication.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

config(); // Carga las variables de entorno desde el archivo .env
console.log(process.env.JWT_SECRET);

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Users.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            secret: 'Passwordpassword',
            signOptions: { expiresIn: '30m'}
          }),
    ],
    providers: [UsersService, AuthService, JwtService],
    controllers: [UsersController, AuthController]
})
export class UsersModule {}
