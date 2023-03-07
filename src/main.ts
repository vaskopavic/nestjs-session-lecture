import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
const connectMongo = require('connect-mongo');

import { AppModule } from './app.module';
import { Cat } from './cats/interfaces/cat.interface';
import { dbString } from './database/database.providers';

declare module 'express-session' {
  interface SessionData {
    cat: Cat;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'session_id',
      secret: 'session key',
      resave: false,
      saveUninitialized: false,
      store: connectMongo.create({
        mongoUrl: dbString,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  await app.listen(8000);
}
bootstrap();
