import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { WebAuthService } from '../web-auth.service';

@Injectable()
export class LocalWebStrategy extends PassportStrategy(Strategy, 'local-web') {
  constructor(private readonly webAuthService: WebAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.webAuthService.validateUser(email, password);
  }
}
