// src/module/customer/name-change-log/service/name-change-log.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DeepPartial } from 'typeorm';
import { NameChangeLogEntity } from '../entity/name-change-log.entity';
import { CreateNameChangeLogDto } from '../dto/create-name-change-log.dto';
import { NameChangeLogRepository } from '../repository/name-change-log.repository';

@Injectable()
export class NameChangeLogService {
  constructor(
    private readonly nameChangeLogRepository: NameChangeLogRepository,
  ) {}

  async getAllNameChangeLogs(): Promise<NameChangeLogEntity[]> {
    return await this.nameChangeLogRepository.findAll();
  }

  async getNameChangeLogById(id: number): Promise<NameChangeLogEntity> {
    const log = await this.nameChangeLogRepository.findById(id);
    if (!log) throw new NotFoundException('Log not found');
    return log;
  }

  async getNameChangeLogsByCustomerId(
    customerId: number,
  ): Promise<NameChangeLogEntity[]> {
    const logsByCustomerId =
      await this.nameChangeLogRepository.findByCustomerId(customerId);
    return logsByCustomerId;
  }

  async createNameChangeLog(
    createDto: CreateNameChangeLogDto,
  ): Promise<NameChangeLogEntity> {
    return await this.nameChangeLogRepository.create(createDto);
  }
}
