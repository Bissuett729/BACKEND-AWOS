import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schemas/users.schema';
import { IResponseUsers } from '../interfaces/users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private UserModel: Model<Users>) {}

    async createNewUser(UserDto: any): Promise<IResponseUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this.UserModel.findOne({'name': UserDto.name});
                if (instance) {
                    throw new HttpException('User already exists!', HttpStatus.FOUND);
                }
                const newUser = new this.UserModel(UserDto);
                const savedUser = await newUser.save();
                const count = await this.UserModel.collection.countDocuments()
                resolve({response: savedUser, count});
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateUser(): Promise<any> {}

    async getAllUsers(): Promise<any> {}

    async getOneUser(): Promise<any> {}

    async DeleteUser(): Promise<any> {}
}
