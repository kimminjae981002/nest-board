import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
