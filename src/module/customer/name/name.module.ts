// /module/customer/name/name.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameController } from './controller/name.controller';
import { NameService } from './service/name.service';
import { NameRepository } from './repository/name.repository';
import { NameEntity } from './entity/name.entity';
import { NameChangeLogModule } from '../name-change-log/name-change-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NameEntity]), // Import the NameEntity repository
    NameChangeLogModule,
  ],
  controllers: [NameController],
  providers: [NameService, NameRepository],
})
export class NameModule {}
