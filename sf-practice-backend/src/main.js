
require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true
  });

  await app.listen(4101, '127.0.0.1');

  console.log('SF Practice backend running on http://127.0.0.1:4101');
}

bootstrap();
