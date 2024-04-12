import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: `A email of user`,
    type: String,
    example: ['admin@gmail.com'],
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A passowrd of user`,
    type: String,
    example: ['Admin123'],
  })
  password: string;
}