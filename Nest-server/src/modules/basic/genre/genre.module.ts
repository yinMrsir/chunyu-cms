import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
