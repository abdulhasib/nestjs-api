// src/module/customer/name-change-log/repository/name-change-log.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NameChangeLogEntity } from '../entity/name-change-log.entity';
import { CreateNameChangeLogDto } from '../dto/create-name-change-log.dto';

@Injectable()
export class NameChangeLogRepository {
  constructor(
    @InjectRepository(NameChangeLogEntity)
    private readonly nameChangeLogRepository: Repository<NameChangeLogEntity>,
  ) {}

  async findAll(): Promise<NameChangeLogEntity[]> {
    const names = await this.nameChangeLogRepository.find();
    if (!names) throw new Error('No names found.');
    return names;
  }

  async findById(id: number): Promise<NameChangeLogEntity> {
    return await this.nameChangeLogRepository.findOne({ where: { id } });
  }

  async findByCustomerId(customerId: number): Promise<any> {
    return await this.nameChangeLogRepository
      .createQueryBuilder('customer_name_change_log')
      .leftJoin('customer_name_change_log.customer', 'customer_name')
      .leftJoin('customer_name_change_log.user', 'user')
      .select([
        `"customer_name"."id" AS id`,
        `"customer_name"."firstname" AS firstname`,
        `"customer_name"."lastname" AS lastname`,
        `"customer_name"."created_at" AS created_at`,
        `json_agg(jsonb_build_object(
          'id', "customer_name_change_log"."id",
          'data', "customer_name_change_log"."data",
          'created_at', "customer_name_change_log"."created_at",
          'user', jsonb_build_object(
              'id', "user"."id",
              'username', "user"."username"
          )
        )) AS customer_name_change_log`,
      ])
      .where('"customer_name"."id" = :customerId', { customerId }) // Use proper parameter name
      .groupBy('"customer_name"."id"') // Group by correct columns
      .addGroupBy('"customer_name"."firstname"') // AddGroupBy for other columns as needed
      .addGroupBy('"customer_name"."lastname"')
      .addGroupBy('"user"."id"') // Group by user id
      .addGroupBy('"user"."username"') // Group by username
      .getRawMany();
  }

  async create(
    createDto: CreateNameChangeLogDto,
  ): Promise<NameChangeLogEntity> {
    try {
      // Create a new instance of NameChangeLogEntity using DTO properties
      const newNameChangeLog = this.nameChangeLogRepository.create(createDto);
      return await this.nameChangeLogRepository.save(newNameChangeLog);
    } catch (error) {
      throw new Error(`Failed to create name change log: ${error.message}`);
    }
  }
}
