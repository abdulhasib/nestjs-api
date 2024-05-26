// /module/customer/name/repository/name.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NameEntity } from '../entity/name.entity';
import { CreateNameDto } from '../dto/create-name.dto';
import { UpdateNameDto } from '../dto/update-name.dto';

@Injectable()
export class NameRepository {
  constructor(
    @InjectRepository(NameEntity)
    private readonly nameRepository: Repository<NameEntity>,
  ) {}

  async findAll(): Promise<NameEntity[]> {
    const names = await this.nameRepository.find();
    if (!names) throw new Error('No names found.');
    return names;
  }

  async findById(id: number): Promise<NameEntity> {
    return this.nameRepository.findOne({ where: { id } });
  }

  async create(createNameDto: CreateNameDto): Promise<NameEntity> {
    const newName = this.nameRepository.create(createNameDto);
    return await this.nameRepository.save(newName);
  }

  async update(id: number, updateNameDto: UpdateNameDto): Promise<NameEntity> {
    const existingName = await this.nameRepository.findOne({ where: { id } });
    if (!existingName) throw new Error('No names found.');
    const updatedName = Object.assign(existingName, updateNameDto);
    return this.nameRepository.save(updatedName);
  }

  async delete(id: number): Promise<{ affected: number }> {
    const deleteResult = await this.nameRepository.delete(id);
    return { affected: deleteResult.affected ?? 0 };
  }
}
