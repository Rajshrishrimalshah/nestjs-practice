import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQServer } from './rabbitmq/rabbitmq-server';
import { RabbitMQClient } from './rabbitmq/rabbitmq-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);

  const app1 = await NestFactory.createMicroservice(AppModule, {
    strategy: new RabbitMQServer('amqp://localhost', 'channel'),
  });

  const app2 = new RabbitMQClient('amqp://localhost', 'channel');
  app2.sendSingleMessage({ message: 'Hello World' }, () => {
    console.log('Callback');
  });

  app1.listen(() => console.log('object'));

  //app1.close();

  // Used for EventPattern and MessagePattern
  // const app1 = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  // });
  // app1.listen(() => console.log('Microservice is listening'));
}
bootstrap();
