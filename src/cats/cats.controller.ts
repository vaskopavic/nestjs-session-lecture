import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() createCatDto: CreateCatDto,
  ): Promise<Cat> {
    const cat = await this.catsService.create(createCatDto);
    request.session.cat = cat;

    new Promise((resolve, reject) => {
      request.session.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      });
    });
    console.log(request.session);

    return cat;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param('id') id: string): Promise<Cat> {
    new Promise((resolve, reject) => {
      request.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      });
    });
    console.log(request.session);

    return this.catsService.delete(id);
  }
}
