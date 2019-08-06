import { RolesGuard } from './../guards/role.guard';
import { Cat } from './interface/ICat';
import { UnauthorizedException } from './../exception/unauthorized.exception';
import { HttpExceptionFilter } from './../exception/http-exception.filter';
import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Res,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { JoiValidationPipe } from 'src/pipe/validation.pipe';
import { CatsService } from './cats.service';
import { creatCatSchema } from './catSchema';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptors';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @Get('api')
  // @HttpCode(200)
  // responseHandler(@Res() response: Response): any {
  //   // throw new UnauthorizedException('You are not authorized person');
  //   response.status(200).send({
  //     message: 'I am Ok',
  //   });
  // }

  // @Get()
  // async findAll() {
  //   throw new HttpException(
  //     {
  //       status: HttpStatus.FORBIDDEN,
  //       error: 'This is a custom message',
  //     },
  //     403,
  //   );
  // }

  // @Get()
  // async findAll() {
  //   throw new ForbiddenException('Forbidden Error Occurred');
  // }

  // @Get()
  //  @UseFilters(new HttpExceptionFilter())
  // async findAll() {
  //   throw new ForbiddenException('Forbidden Error Occurred');
  // }

  @Post('create')
  @UseGuards(RolesGuard)
  @UsePipes(new JoiValidationPipe(creatCatSchema))
  @SetMetadata('roles', ['admin'])
  @UseInterceptors(LoggingInterceptor)
  async createCat(@Body() createCatDto: CreateCatDto, @Req() request: Request) {
    this.catsService.create(createCatDto);
    // tslint:disable-next-line:no-console
    console.log('Headers', request.headers);
    return {
      message: 'New record inserted !',
    };
  }

  // @Get(':id')
  // paramHandler(@Param() params): any {
  //   return {
  //     message: `This action returns a #${params.id} cat`,
  //   };
  // }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Post('/body')
  // async create(@Body() createCatDto: CreateCatDto) {
  //   return {
  //     message: 'New record inserted !',
  //   };
  // }
}
