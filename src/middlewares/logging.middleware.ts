import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction,Response,Request } from 'express';

export class LoggingMiddleware implements NestMiddleware{
    // 직접 명시
    private readonly logger = new Logger();

    // 미들웨어 실행
    use(req: Request, res: Response, next: NextFunction) {
        
        // 원본 url과 http method
        const { method, originalUrl } = req;;
        const startTime = Date.now();

        // api가 완료되었을떄 호출
        res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = Date.now() - startTime;

            this.logger.log(`[${method}]${originalUrl}:${statusCode} - ${responseTime}`,)
        })
        
        next()
    }
}