import { Controller, Get } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  @Get()
  getHello(): object {
    return {
      message: 'Return all dogs',
    };
  }
}
