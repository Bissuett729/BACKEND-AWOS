import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    public getStatusServer() {
        return 'Server ON';
    }
}