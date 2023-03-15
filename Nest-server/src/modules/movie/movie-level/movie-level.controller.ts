import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieLevelService } from './movie-level.service';
import { CreateMovieLevelDto } from './dto/create-movie-level.dto';
import { UpdateMovieLevelDto } from './dto/update-movie-level.dto';
import { User, UserEnum } from '../../../common/decorators/user.decorator';
import { UserInfoPipe } from '../../../common/pipes/user-info.pipe';
import { RepeatSubmit } from '../../../common/decorators/repeat-submit.decorator';
import { PaginationPipe } from '../../../common/pipes/pagination.pipe';
import { QueryMovieLevelDto } from './dto/query-movie-level.dto';

@Controller('movie/level')
export class MovieLevelController {
  constructor(private readonly movieLevelService: MovieLevelService) {}

  @RepeatSubmit()
  @Post()
  async create(
    @Body() createMovieLevelDto: CreateMovieLevelDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    createMovieLevelDto.createBy = createMovieLevelDto.updateBy = userName;
    await this.movieLevelService.create(createMovieLevelDto);
  }

  @Get('list')
  list(@Query(PaginationPipe) queryMovieLevelDto: QueryMovieLevelDto) {
    return this.movieLevelService.findPageAll(queryMovieLevelDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieLevelService.findOne(+id);
  }

  @Put()
  async update(
    @Body() updateMovieLevelDto: UpdateMovieLevelDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    updateMovieLevelDto.updateBy = userName;
    await this.movieLevelService.update(updateMovieLevelDto);
  }

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    await this.movieLevelService.remove(ids);
  }
}
