import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubDateService } from './pub-date.service';
import { PubDateController } from './pub-date.controller';
import { PubDate } from './entities/pub-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PubDate])],
  controllers: [PubDateController],
  providers: [PubDateService],
  exports: [PubDateService],
})
export class PubDateModule {}
