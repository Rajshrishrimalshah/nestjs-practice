import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  EventPattern,
  Client,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log('EVENT', data);
    return data;
  }
}
