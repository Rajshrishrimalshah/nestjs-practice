// tslint:disable-next-line:no-console
console.log(this.cats);
import { Cat } from './interface/ICat';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }
}
