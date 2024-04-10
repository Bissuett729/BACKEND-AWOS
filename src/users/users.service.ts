import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private UserModel: Model<Users>) {}

    async createNewUser(UserDto: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this.UserModel.findOne({'name': UserDto.name});
                if (instance) {
                    throw new HttpException('User already exists!', HttpStatus.FOUND);
                }
                const newUser = new this.UserModel(UserDto);
                const savedUser = await newUser.save();
                resolve(savedUser);
            } catch (error) {
                reject(error);
            }
        });
    }
    
}
