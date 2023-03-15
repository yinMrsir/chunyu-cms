import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './video-list.service';
import { VideoController } from './video-list.controller';
import { Video } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
