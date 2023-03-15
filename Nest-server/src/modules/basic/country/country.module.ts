import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { Country } from "./entities/country.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}
