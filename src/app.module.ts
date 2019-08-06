import { LoggerMiddleware } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { DogsController } from './dogs/dogs.controller';
import { AnimalsController } from './animals/animals.controller';
import { logger } from './middleware/function.middleware';
import { CatsService } from './cats/cats.service';
import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { MathController } from './math/math.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsController,
    DogsController,
    AnimalsController,
    MathController,
  ],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .forRoutes(CatsController, DogsController);
  }
}
