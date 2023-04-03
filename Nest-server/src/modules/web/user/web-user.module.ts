import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WebUser } from './entities/web-user.entity';
import { WebUserController } from './web-user.controller';
import { WebUserService } from './web-user.service';
import { jwtConstants } from '../../system/auth/auth.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([WebUser]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '168h' },
    }),
  ],
  controllers: [WebUserController],
  providers: [WebUserService],
  exports: [WebUserService],
})
export class WebUserModule {}
