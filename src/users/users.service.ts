import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private UserModel: Model<Users>) {}

    async createNewUser(User: any) {
        const createUser = new this.UserModel(User)
        return createUser.save()
    }
}
