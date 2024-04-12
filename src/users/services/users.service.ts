import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as I from '../interfaces/index'
import * as DTO from '../dto/index'
import { Users } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private _USER: Model<I.IUsers>) {}

    async createNewUser(UserDto: any): Promise<I.IResponseUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({'name': UserDto.name});
                if (!instance) throw new NotFoundException('User already exists!');
                const newUser = new this._USER(UserDto);
                const savedUser = await newUser.save();
                const count = await this._USER.collection.countDocuments()
                resolve({response: savedUser, count});
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateUser(): Promise<any> {}

    async getAllUsers(): Promise<any> {}

    async getOneUser(): Promise<any> {}

    async DeleteUser(_id: Types.ObjectId, payload:DTO.activeDTO): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({_id});
                if (!instance) throw new NotFoundException(`${_id} not found!`);
                instance.active = payload._active;
                const response = await instance.save();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}
