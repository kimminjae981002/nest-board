import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// guard 'local' 명시를 파일로 분리
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
