import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { Cast } from './entities/cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  controllers: [CastController],
  providers: [CastService],
  exports: [CastService],
})
export class CastModule {}
