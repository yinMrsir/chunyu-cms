import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Columns } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Columns])],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
