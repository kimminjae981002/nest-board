import { Controller, Get, HttpException, HttpStatus, Logger, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 의존성 주입이 아니라 직접 명시
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log')
  log(): void {
    this.logger.log('message')
    this.logger.debug('message')
    this.logger.error('message')
    this.logger.fatal('message')
    this.logger.verbose('message')
    this.logger.warn('message')
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
