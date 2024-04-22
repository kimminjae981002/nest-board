import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return this.appService.getHello();
  }

  @Get('exception')
  exception(): string {
    throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  }

  @Get('paramName/:name')
  getParamName(@Param('name')name: string): string {
    return `${name} hello`;
  }

  @Get('queryName')
  getQueryName(@Query('name')name: string): string {
    return `${name} hello`;
  }
}
