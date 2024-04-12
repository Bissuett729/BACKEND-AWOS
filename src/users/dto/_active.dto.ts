/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class activeDTO {
    @ApiProperty({
        name: "_active",
        type: 'boolean',
        description: 'To activate or deactivate a user',
        example: true
    })
    @IsBoolean() _active: boolean;

}