import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A name of user`,
    type: String,
    example: ['Miguel Bissuett'],
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: `A list of user's roles`,
    type: String,
    example: ['admin'],
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A color`,
    type: String,
    example: ['Admin123'],
  })
  color: string;
}