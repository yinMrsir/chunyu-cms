import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MovieRoleService } from './movie-role.service';
import { CreateMovieRoleDto } from './dto/create-movie-role.dto';
import { UpdateMovieRoleDto } from './dto/update-movie-role.dto';
import { User, UserEnum } from "../../../common/decorators/user.decorator";
import { UserInfoPipe } from "../../../common/pipes/user-info.pipe";
import { PaginationPipe } from "../../../common/pipes/pagination.pipe";
import {QueryAllMovieRoleDto, QueryMovieRoleDto} from "./dto/query-movie-role.dto";
import { RepeatSubmit } from "../../../common/decorators/repeat-submit.decorator";

@Controller('movie/role')
export class MovieRoleController {
  constructor(private readonly movieRoleService: MovieRoleService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() createMovieRoleDto: CreateMovieRoleDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createMovieRoleDto.createBy = createMovieRoleDto.updateBy = userName;
    await this.movieRoleService.create(createMovieRoleDto);
  }

  @Get('list')
  list(
    @Query(PaginationPipe) queryMovieRoleDto: QueryMovieRoleDto
  ) {
    return this.movieRoleService.findPageList(queryMovieRoleDto);
  }

  @Get('all')
  all(@Query() queryAllMovieRoleDto: QueryAllMovieRoleDto) {
    return this.movieRoleService.findAll(queryAllMovieRoleDto)
  }

  @Put()
  update(@Body() updateMovieRoleDto: UpdateMovieRoleDto) {
    return this.movieRoleService.update(updateMovieRoleDto);
  }

  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    return this.movieRoleService.remove(ids);
  }
}
