import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users/v1/')
export class UsersController {
    constructor(private UserService: UsersService) {}

    @Post('createNewUser')
    async createNewUser(@Body() CreateUser: any) {
        return CreateUser
    }
}
