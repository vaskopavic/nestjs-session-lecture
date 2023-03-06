import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
  exports: [CatsService, ...catsProviders],
})
export class CatsModule {}
