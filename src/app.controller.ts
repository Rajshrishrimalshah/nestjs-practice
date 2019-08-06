import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Client,
  Transport,
  ClientProxy,
  ClientsModule,
  EventPattern,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  async callPattern(): Promise<number> {
    console.log('Pattern Invoked');
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, payload).toPromise();
  }

  @Post()
  async callEvent() {
    console.log('Method Invoked');
    return await this.client.emit('user_created', { age: 5 }).toPromise();
  }
}
