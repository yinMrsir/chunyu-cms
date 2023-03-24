import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieBasicService } from './movie-basic.service';
import { MovieBasicController } from './movie-basic.controller';
import { MovieBasic } from './entities/movie-basic.entity';
import { MoviePv } from './entities/movie-pv.entity';
import { PubDateModule } from '../pub-date/pub-date.module';
import { MovieLevelModule } from '../movie-level/movie-level.module';
import { CastModule } from '../cast/cast.module';
import { RoleActorModule } from '../role-actor/role-actor.module';
import { MovieVideosModule } from '../videos/movie-videos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieBasic, MoviePv]),
    PubDateModule,
    MovieLevelModule,
    CastModule,
    RoleActorModule,
    MovieVideosModule,
  ],
  controllers: [MovieBasicController],
  providers: [MovieBasicService],
  exports: [MovieBasicService],
})
export class MovieBasicModule {}
