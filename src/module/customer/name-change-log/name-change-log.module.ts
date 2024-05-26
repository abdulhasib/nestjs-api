// src/module/customer/name-change-log/name-change-log.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameChangeLogController } from './controller/name-change-log.controller';
import { NameChangeLogService } from './service/name-change-log.service';
import { NameChangeLogRepository } from './repository/name-change-log.repository';
import { NameChangeLogEntity } from './entity/name-change-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NameChangeLogEntity])],
  controllers: [NameChangeLogController],
  providers: [NameChangeLogService, NameChangeLogRepository],
  exports: [NameChangeLogService],
})
export class NameChangeLogModule {}
