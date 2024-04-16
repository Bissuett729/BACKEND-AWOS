import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import * as Interceptor from '../../common/interceptors/index'
import { GroupsService } from '../services/groups.service';
import { Types } from 'mongoose';
import * as DTO from '../dtos/index'
import * as I from '../interfaces/index'


@Controller('groups/v1/')
@ApiTags('Groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get('get-all-groups/:_order/:_since/:_limit/:_active/:_search')
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
    async findallGroups( @Param() param ):Promise <I.responseGroups>{
        return await this.groupsService.getAllGroups(param);
    }

    @Get('get-one-group/:_id')
    @ApiOperation({ description: 'Get a group' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of group',
      })
    @ResponseDecorator()
    async getOneGroup(@Param() _id: Types.ObjectId):Promise <I.Groups> {
        return await this.groupsService.getOneGroup(_id)
    }

    @Post('create-new-group')
    @ApiOperation({ description: 'create a new group' })
    @ApiBody({
        description: 'With this API you can create a new group',
        // type: any,
        examples: {
            'example': {
                value: {
                    title: "AWOS",
                    description: "Grupo para la clase de aplicaciones web.",
                }
            }
        }
    })
    @ResponseDecorator()
    async createNewGroup(@Body() CreateGroup: DTO.createGroup):Promise <I.Groups>  {
        return await this.groupsService.createNewGroup(CreateGroup)
    }

    @Patch('update-active-group-by-id/:_id')
    @ApiOperation({ description: 'Delete a group' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of group',
      })
    @ApiBody({
        description: 'To activate or deactivate a group',
        // type: any,
        examples: {
            'example': {
                value: {
                    active: true
                }
            }
        }
    })
    @ResponseDecorator()
    async deleteAGroup(@Param() _id: Types.ObjectId, @Body() activeGroup: {active: boolean}):Promise <I.Groups> {
        return await this.groupsService.updateGroupActiveStatus(_id, activeGroup)
    }

    @Patch('update-props-group/:_id')
    @ApiOperation({ description: 'Update props a group' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of group',
      })
    @ApiBody({
        description: 'This API can be used to delete or restore a group',
        examples: {
            'example': {
                value: {
                    prop: 'key'
                }
            }
        }
    })
    @ResponseDecorator()
    async updatePropsGroup(@Param() _id: Types.ObjectId, @Body() props: Record<string, any>):Promise <I.Groups>  {
        return await this.groupsService.updatePropsGroup(_id, props)
    }

    @Patch('add-note-to-group/:_id')
    @ApiOperation({ description: 'This API is used to add a note to a group.' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of group',
      })
    @ApiBody({
        description: 'This API is used to add a note to a group.',
        // type: any,
        examples: {
            'example': {
                value: {
                    idNote: '661c7dbe82397fdfe179c25b'
                }
            }
        }
    })
    @ResponseDecorator()
    async addNoteToGroup(@Param() _id: Types.ObjectId, @Body() idNote: Types.ObjectId):Promise <I.Groups> {
        return await this.groupsService.addNoteToGroup(_id, idNote)
    }

    @Delete('delete-group/:_id')
    @ApiOperation({ description: 'This API is used to delete a group.' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of group',
      })
    @ResponseDecorator()
    async deleteGroup(@Param() _id: Types.ObjectId):Promise <any> {
        return await this.groupsService.deleteGroup(_id)
    }

}
