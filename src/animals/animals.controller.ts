import { Controller, Get, Param } from '@nestjs/common';

@Controller('animals')
export class AnimalsController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get()
  findAll() {
    // This endpoint will never get called
    // because the "/cats" request is going
    // to b\

    return 'Welcome';
  }
}
