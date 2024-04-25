import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// jwt token 구분
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
