import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as I from '../interfaces/index'
import * as DTO from '../dto/index'
import * as bcrypt from 'bcrypt';
import { Users } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private _USER: Model<Users>) {}

    async createNewUser(payload: DTO.CreateUserDto): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({'name': payload.name});
                if (instance) throw new NotFoundException('User already exists!');
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password= hashedPassword
                const newUser = new this._USER(payload);
                const savedUser = await newUser.save();
                // const count = await this._USER.collection.countDocuments()
                resolve(savedUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllUsers(): Promise<any> {}

    async getOneUser(_id: Types.ObjectId): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findById(_id);
                if (!instance) throw new NotFoundException(`User not found!`);
                resolve(instance)
            } catch (error) {
                reject(error);
            }
        })
    }

    async updatePropsUser(_id: Types.ObjectId, payload): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findById(_id);
                if (!instance) throw new NotFoundException(`User with ID ${_id} not found!`);
                for (const key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        instance[key] = payload[key];
                    }
                }
                const response = await instance.save();
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateUserActiveStatus(_id: Types.ObjectId, payload: DTO.activeDTO): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findById(_id);
                if (!instance) throw new NotFoundException(`User with ID ${_id} not found!`);
                instance.active = payload._active;
                resolve(instance.save());
            } catch (error) {
                reject(error);
            }
        })
    }
}
