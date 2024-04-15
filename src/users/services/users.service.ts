import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as I from '../interfaces/index'
import * as DTO from '../dto/index'
import * as bcrypt from 'bcrypt';
import { Users } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { EventsGateway } from 'src/shared/gateway/gateway';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private _USER: Model<Users>, private readonly _appGateway: EventsGateway,) {}

    async createNewUser(payload: DTO.CreateUserDto): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({'name': payload.name});
                if (instance) throw new NotFoundException('User already exists!');
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password= hashedPassword
                const newUser = new this._USER(payload);
                const response = await newUser.save();
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-CREATE-NEW-USER', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllUsers(payload):Promise<any>{
        return new Promise(async(resolve, reject)=>{
            try {
                const newObj: any = {};
                if (payload._search == '_')  newObj.active = payload._active
                else{
                    const regex = new RegExp(payload._search, 'i');
                    newObj['$or'] = [
                        { name     : regex, active : payload._active },
                    ];
                }
                const since = Number(payload._since || 0);
                const limit = Number(payload._limit || 5);
                const order = payload._order ? 1 : -1 ;
                const response = await this._USER.find(newObj).skip(since).limit(limit).sort({updatingDate:order})
                const count = await this._USER.countDocuments(newObj)
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ALL-USERS', { ok:true, data: response, msg: "Socket Success!" } );
                resolve({response, count});
            } catch (error) {
                reject(error);
            }
        });
    }

    async getOneUser(_id: Types.ObjectId): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findById(_id);
                if (!instance) throw new NotFoundException(`User not found!`);
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ONE-USER', { ok:true, data: instance, msg: "Socket Success!" } );
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
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-UPDATE-ONE-PROPERTY', { ok:true, data: response, msg: "Socket Success!" } );
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
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-DEACTIVE-OR-ACTIVE-USER', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance.save());
            } catch (error) {
                reject(error);
            }
        })
    }
}
