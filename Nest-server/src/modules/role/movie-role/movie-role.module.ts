import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRoleService } from './movie-role.service';
import { MovieRoleController } from './movie-role.controller';
import { MovieRole } from "./entities/movie-role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MovieRole])],
  controllers: [MovieRoleController],
  providers: [MovieRoleService]
})
export class MovieRoleModule {}
