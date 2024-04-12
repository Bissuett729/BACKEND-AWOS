import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import * as DTO from '../dto/index'
import { Types } from 'mongoose';

@Controller('/users/v1/')
@ApiTags('Users')
export class UsersController {
    constructor(private UserService: UsersService) { }

    @Get('get-one-user/:_id')
    @ApiOperation({ description: 'Get a user' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of user',
      })
    @ResponseDecorator()
    async getOneUser(@Param() _id: Types.ObjectId) {
        return await this.UserService.getOneUser(_id)
    }

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

    @Patch('update_active-user-by-id/:_id')
    @ApiOperation({ description: 'Delete a user' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of user',
      })
    @ApiBody({
        description: 'To activate or deactivate a user',
        type: DTO.activeDTO,
        examples: {
            'example-1': {
                value: {
                    _active: true
                }
            }
        }
    })
    @ResponseDecorator()
    async deleteAUser(@Param() _id: Types.ObjectId, @Body() activeUser: DTO.activeDTO) {
        return await this.UserService.updateUserActiveStatus(_id, activeUser)
    }

    @Patch('update_props_user/:_id')
    @ApiOperation({ description: 'Update props a user' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of user',
      })
    @ApiBody({
        description: 'Update props a user',
        examples: {
            'example-1': {
                value: {
                    prop: 'key'
                }
            }
        }
    })
    @ResponseDecorator()
    async updatePropsUser(@Param() _id: Types.ObjectId, @Body() props: Record<string, any>) {
        return await this.UserService.updatePropsUser(_id, props)
    }
}
