import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import { Types } from 'mongoose';
import * as Interceptor from '../../common/interceptors/index'
import { NotesService } from 'src/notes/services/notes/notes.service';
import * as I from '../interfaces/index'
import * as DTO from '../dtos/index'

@Controller('notes/v1/')
@ApiTags('Notes')
export class NotesController {

    constructor(private notesService: NotesService) { }

    @Get('get-all-notes/:_order/:_since/:_limit/:_active/:_search')
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
    async findallNote( @Param() param ):Promise <I.responseNotes>{
        return await this.notesService.getAllNote(param);
    }

    @Get('get-one-note/:_id')
    @ApiOperation({ description: 'Get a note' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of note',
      })
    @ResponseDecorator()
    async getOneNote(@Param() _id: Types.ObjectId):Promise <I.notes> {
        return await this.notesService.getOneNote(_id)
    }

    @Post('create-new-note')
    @ApiOperation({ description: 'create a new note' })
    @ApiBody({
        description: 'With this API you can create a new note',
        type: DTO.createNote,
        examples: {
            'example': {
                value: {
                    title: "Tema visto en AWOS",
                    icon: "ri-chat-quote-line",
                    summary: 'Texto de ejemplo',
                    image: 'imgb64',
                    typeOfImg: 'png',
                    titleOfImg: 'titulo de la imagen',
                }
            }
        }
    })
    @ResponseDecorator()
    async createNewNote(@Body() CreateNote: DTO.createNote):Promise <I.notes>  {
        return await this.notesService.createNewNote(CreateNote)
    }

    @Patch('update-active-note-by-id/:_id')
    @ApiOperation({ description: 'To activate or deactivate a note' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of note',
      })
    @ApiBody({
        description: 'To activate or deactivate a note',
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
    async deleteANote(@Param() _id: Types.ObjectId, @Body() activeNote: {active: boolean}):Promise <I.notes> {
        return await this.notesService.updateNoteActiveStatus(_id, activeNote)
    }

    @Patch('update-props-note/:_id')
    @ApiOperation({ description: 'Update props a note' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of note',
      })
    @ApiBody({
        description: 'This API can be used to delete or restore a note',
        examples: {
            'example': {
                value: {
                    prop: 'key'
                }
            }
        }
    })
    @ResponseDecorator()
    async updatePropsNote(@Param() _id: Types.ObjectId, @Body() props: Record<string, any>):Promise <I.notes>  {
        return await this.notesService.updatePropsNote(_id, props)
    }

    @Patch('create-new-comment-for-note/:_id')
    @ApiOperation({ description: 'This API is used to create a new comment and add it to a note.' })
    @ApiParam({
        name: '_id',
        description: 'Get ID of note',
      })
    @ApiBody({
        description: 'This API is used to create a new comment and add it to a note.',
        examples: {
            'example': {
                value: {
                    comment: 'Hola grupo',
                    idUser: '',
                }
            }
        }
    })
    @ResponseDecorator()
    async createNewComments(@Param() _id: Types.ObjectId, @Body() payload: any):Promise <I.notes>  {
        return await this.notesService.createNewComment(_id, payload)
    }

}

