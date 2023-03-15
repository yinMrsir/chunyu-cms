import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { Profession } from "./entities/profession.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Profession])],
  controllers: [ProfessionController],
  providers: [ProfessionService]
})
export class ProfessionModule {}
