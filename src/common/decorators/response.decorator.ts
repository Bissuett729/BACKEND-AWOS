import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function ResponseDecorator() {

    return applyDecorators(

        ApiResponse({
            status: 200,
            description: 'OK'
        }),
        ApiResponse({
            status: 201,
            description: 'Document Created'
        }),
        ApiResponse({
            status: 400,
            description: 'Client Error'
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized'
        }),
        ApiResponse({
            status: 403,
            description: 'Action Denied'
        }),
        ApiResponse({
            status: 404,
            description: 'Not Found'
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict'
        }),
        ApiResponse({
            status: 500,
            description: 'Internal Server Error'
        })

    )


}