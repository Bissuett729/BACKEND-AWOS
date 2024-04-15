import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventsGateway } from 'src/shared/gateway/gateway';
import { Groups } from '../schemas/groups.schema';
import * as I from '../interfaces/index'
import * as DTO from '../dtos/index'

@Injectable()
export class GroupsService {
    constructor(@InjectModel(Groups.name) private _GROUPS: Model<Groups>, private readonly _appGateway: EventsGateway,) {}

    private generateRandomCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async createNewGroup(payload: DTO.createGroup): Promise<I.Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._GROUPS.findOne({'title': payload.title});
                if (instance) throw new NotFoundException('Group already exists!');
                const newGroup = new this._GROUPS(payload);
                newGroup.code = this.generateRandomCode(8)
                console.log(newGroup.code);
                const response = await newGroup.save();
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-CREATE-NEW-GROUP', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllGroups(payload):Promise<I.responseGroups>{
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
                const response = await this._GROUPS.find(newObj).skip(since).limit(limit).sort({updatingDate:order})
                const count = await this._GROUPS.countDocuments(newObj)
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ALL-GROUPS', { ok:true, data: {response, count}, msg: "Socket Success!" } );
                resolve({response, count});
            } catch (error) {
                reject(error);
            }
        });
    }

    async getOneGroup(_id: Types.ObjectId): Promise<I.Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._GROUPS.findById(_id);
                if (!instance) throw new NotFoundException(`Group not found!`);
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ONE-GROUP', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance)
            } catch (error) {
                reject(error);
            }
        })
    }

    async updatePropsGroup(_id: Types.ObjectId, payload): Promise<I.Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._GROUPS.findById(_id);
                if (!instance) throw new NotFoundException(`Group with ID ${_id} not found!`);
                for (const key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        instance[key] = payload[key];
                    }
                }
                const response = await instance.save();
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-UPDATE-ONE-PROP-GROUP', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateGroupActiveStatus(_id: Types.ObjectId, payload: any): Promise<I.Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._GROUPS.findById(_id);
                if (!instance) throw new NotFoundException(`Group with ID ${_id} not found!`);
                instance.active = payload._active;
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-DEACTIVATE-OR-ACTIVATE-GROUP', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance.save());
            } catch (error) {
                reject(error);
            }
        })
    }

    async addNoteToGroup(_id: Types.ObjectId, noteId: Types.ObjectId): Promise<I.Groups> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._GROUPS.findById(_id);
                if (!instance) throw new NotFoundException(`Group with ID ${_id} not found!`);
                instance.notes.push(noteId)
                const response = instance.save()
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-ADD-NOTE-TO-GROUP', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
      }
}
