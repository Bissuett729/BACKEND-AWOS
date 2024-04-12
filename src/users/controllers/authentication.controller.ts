import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseDecorator } from 'src/common/decorators/response.decorator';
import * as DTO from '../dto/index'
import { AuthService } from '../services/auth.service';

@Controller('/auth/v1/')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiBody({
        description: 'This API is used to log in with a password and an email address.',
        type: DTO.LoginDTO,
        examples: {
            'example': {
                value: {
                    email: "miguelangel.292020@gmail.com",
                    password: "P@ssw0rd123!"
                }
            }
        }
    })
    @ResponseDecorator()
    async getOneUser(@Body() login: DTO.LoginDTO) {
        return await this.authService.login(login)
    }
}
