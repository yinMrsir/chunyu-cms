import { Module } from '@nestjs/common';
import { LocalWebStrategy } from './strategies/local-web.strategy';
import { JwtWebStrategies } from './strategies/jwt-web.strategies';
import { WebAuthService } from './web-auth.service';
import { WebUserModule } from '../user/web-user.module';

@Module({
  imports: [WebUserModule],
  providers: [LocalWebStrategy, JwtWebStrategies, WebAuthService],
})
export class WebAuthModule {}
