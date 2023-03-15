import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Language } from './entities/language.entity';
import { MovieBasic } from '../../movie/basic/entities/movie-basic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language, MovieBasic])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
