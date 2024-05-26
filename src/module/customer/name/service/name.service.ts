// /module/customer/name/service/name.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { NameEntity } from '../entity/name.entity';
import { CreateNameDto } from '../dto/create-name.dto';
import { UpdateNameDto } from '../dto/update-name.dto';
import { NameRepository } from '../repository/name.repository';

@Injectable()
export class NameService {
  constructor(private readonly nameRepository: NameRepository) {}

  async getAllNames(): Promise<NameEntity[]> {
    return await this.nameRepository.findAll();
  }

  async getNameById(id: number): Promise<NameEntity> {
    const name = await this.nameRepository.findById(id);
    if (!name) throw new NotFoundException('Name not found');
    return name;
  }

  async createName(createNameDto: CreateNameDto): Promise<NameEntity> {
    return this.nameRepository.create(createNameDto);
  }

  async updateName(
    id: number,
    updateNameDto: UpdateNameDto,
  ): Promise<NameEntity> {
    const existingName = await this.nameRepository.findById(id);
    if (!existingName) {
      throw new NotFoundException('Name not found');
    }
    return await this.nameRepository.update(id, updateNameDto);
  }

  async deleteName(id: number): Promise<void> {
    const name = await this.getNameById(id);
    if (!name) throw new NotFoundException('Name not found');
    const result = await this.nameRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Name not found');
  }
}
