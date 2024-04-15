import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import * as DTO from '../dto/index'
import { Types } from 'mongoose';
import * as Interceptor from '../../common/interceptors/index'
import * as I from '../interfaces/index'

@Controller('/users/v1/')
@ApiTags('Users')
export class UsersController {
    constructor(private UserService: UsersService) { }


    @Get('get-all-users/:_order/:_since/:_limit/:_active/:_search')
    @ApiParam( { 
        name:'_order', 
        type: Boolean, 
        description:'Sort information, true to obtain the information in an ascending way, false for descending.', 
        example: true,
        required: true 
    } )
    @ApiParam( { 
        name:'_since', 
        type: Number, 
        description:'Ignores the first records found according to the number sent, ideal for pagination.', 
        example: 0,
        required: true 
    } )
    @ApiParam( { 
        name:'_limit', 
        type: Number, 
        description:'It limits the number of data obtained and will respond to the numerical amount ordered.', 
        example: 0,
        required: true 
    } )
    @ApiParam( { 
        name:'_active', 
        type: Boolean, 
        description:'It will only respond with data that are active or inactive according to the boolean.', 
        example: true,
        required: true 
    } )
    @ApiParam( { 
        name:'_search', 
        type: String, 
        description:'It will search for specific matches according to the written text.', 
        example: '_',
        required: true 
    } )
    @UseInterceptors(Interceptor.getParamInterceptor)
    @ResponseDecorator()
    async findAllUsers( @Param() param ):Promise <I.IResponseUsers>{
        return await this.UserService.getAllUsers(param);
    }


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

    @Post('create-new-user')
    @ApiOperation({ description: 'This API is used to create a new user' })
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

    @Patch('update-active-user-by-id/:_id')
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

    @Patch('update-props-user/:_id')
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
