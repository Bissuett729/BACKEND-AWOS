import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import { Model } from 'mongoose';
import * as I from '../interfaces/index'
import * as DTO from '../dto/index'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Users.name) private _USER: Model<Users>) {}

    public async login(payload: DTO.LoginDTO): Promise<I.IUsers> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({'email': payload.email});
                if (!instance) throw new NotFoundException('Email no exist');
                const passwordMatch = await bcrypt.compare(
                    payload.password,
                    instance.password,
                );
                if (!passwordMatch) throw new UnauthorizedException('Invalid password');
                resolve(instance)
            } catch (error) {
                reject(error);
            }
        });
    }
}
