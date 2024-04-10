import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: `A list of user's roles`,
    example: ['admin'],
})
  email: string;

  @IsNotEmpty()
  password: string;
}