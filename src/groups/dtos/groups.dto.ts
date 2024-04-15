import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createGroup{

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A title of group`,
    type: String,
    example: ['AWOS'],
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A description of group`,
    type: String,
    example: ['Grupo para la clase de aplicaciones web.'],
  })
  description: string;
}