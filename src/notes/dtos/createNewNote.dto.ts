import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createNote{

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A title of note`,
    type: String,
    example: ['Tema visto en AWOS'],
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A icon of note`,
    type: String,
    example: ['ri-chat-quote-line'],
  })
  icon: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A summary of the note`,
    type: String,
    example: ['Texto de ejemplo'],
  })
  summary: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A img of the note`,
    type: String,
    example: ['Texto de ejemplo'],
  })
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A type of the img`,
    type: String,
    example: ['png'],
  })
  typeOfImg: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `A title of the img`,
    type: String,
    example: ['titulo de la imagen'],
  })
  titleOfImg: string;
}