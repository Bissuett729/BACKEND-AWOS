import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('/users/v1/')
@ApiTags('Users')
export class UsersController {
    constructor(private UserService: UsersService) { }

    @Post('createNewUser')
    @ApiOperation({ description: 'create a new user' })
    @ApiBody({
        description: 'Name of the user',
        type: CreateUserDto,
        examples: {
            'example-1': {
                value: {
                    name: "Miguel Bissuett",
                    email: "miguelangel.292020@gmail.com",
                    password: "P@ssw0rd123!"
                }
            }
        }
    })
    @ResponseDecorator()
    async createNewUser(@Body() CreateUser: CreateUserDto) {
        return await this.UserService.createNewUser(CreateUser)
    }
}
