import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { EventsGateway } from 'src/shared/gateway/gateway';
import * as DTO from '../dto/index'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(Users.name) private _USER: Model<Users>,
        private readonly _appGateway: EventsGateway
    ) {}

    public async createToken(payload: DTO.LoginDTO): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const instance = await this._USER.findOne({'email': payload.email});
                if (!instance) throw new NotFoundException('Email no exist');
                const passwordMatch = await bcrypt.compare(
                    payload.password,
                    instance.password,
                );
                if (!passwordMatch) throw new UnauthorizedException('Invalid password');
                const userObject = instance.toObject();
                delete userObject.password;
                const jwt = this.jwtService.sign({ user: userObject });
                this._appGateway.emitEvent('SOCKET-ACADEMICLOUD-LOGIN', { ok:true, data: {userFound:userObject, token: jwt}, msg: "Socket Success!" } );
                resolve({userFound:userObject, token: jwt})
            } catch (error) {
                reject(error);
            }
        });
    }
}
