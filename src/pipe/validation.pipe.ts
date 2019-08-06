import * as Joi from '@hapi/joi';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: object) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // tslint:disable-next-line:no-console
    const { error } = Joi.validate(value, this.schema);
    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
