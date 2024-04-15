import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventsGateway } from 'src/shared/gateway/gateway';
import { Notes } from 'src/notes/schemas/notes.schema';
import * as I from '../../interfaces/index'

@Injectable()
export class NotesService {
    constructor(@InjectModel(Notes.name) private _NOTES: Model<Notes>, private readonly _appGateway: EventsGateway,) {}

    async createNewNote(payload: any): Promise<I.notes> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._NOTES.findOne({'title': payload.title});
                if (instance) throw new NotFoundException('Note already exists!');
                const newNote = new this._NOTES(payload);
                const response = await newNote.save();
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-CREATE-NEW-NOTE', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAllNote(payload):Promise<I.responseNotes>{
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
                const response = await this._NOTES.find(newObj).skip(since).limit(limit).sort({updatingDate:order})
                const count = await this._NOTES.countDocuments(newObj)
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ALL-NOTE', { ok:true, data: {response, count}, msg: "Socket Success!" } );
                resolve({response, count});
            } catch (error) {
                reject(error);
            }
        });
    }

    async getOneNote(_id: Types.ObjectId): Promise<I.notes> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._NOTES.findById(_id);
                if (!instance) throw new NotFoundException(`Note not found!`);
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-GET-ONE-NOTE', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance)
            } catch (error) {
                reject(error);
            }
        })
    }

    async updatePropsNote(_id: Types.ObjectId, payload): Promise<I.notes> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._NOTES.findById(_id);
                if (!instance) throw new NotFoundException(`Note with ID ${_id} not found!`);
                for (const key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        instance[key] = payload[key];
                    }
                }
                const response = await instance.save();
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-UPDATE-ONE-PROP-NOTE', { ok:true, data: response, msg: "Socket Success!" } );
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    async updateNoteActiveStatus(_id: Types.ObjectId, payload: any): Promise<I.notes> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._NOTES.findById(_id);
                if (!instance) throw new NotFoundException(`Note with ID ${_id} not found!`);
                instance.active = payload._active;
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-DEACTIVATE-OR-ACTIVATE-NOTE', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance.save());
            } catch (error) {
                reject(error);
            }
        })
    }

    async createNewComment(_id: Types.ObjectId, payload: any): Promise<I.notes> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._NOTES.findById(_id);
                if (!instance) throw new NotFoundException(`Note with ID ${_id} not found!`);
                const newComment = {...payload, registerDay: new Date().toISOString()}
                instance.comments.push(newComment)
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-CREATE-NEW-COMMENT', { ok:true, data: instance, msg: "Socket Success!" } );
                resolve(instance.save());
            } catch (error) {
                reject(error);
            }
        })
    }
}
