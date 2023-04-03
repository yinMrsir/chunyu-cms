import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalWebAuthGuard extends AuthGuard('local-web') {}
