import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerState(): string {
    return 'Server On';
  }
}
