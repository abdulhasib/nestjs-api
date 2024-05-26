import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entity/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async findAll(): Promise<AddressEntity[]> {
    const addresss = this.addressRepository.find();
    if (!addresss) throw new Error('No addresss found.');
    return addresss;
  }

  async findById(id: number): Promise<AddressEntity> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    const newAddress = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(newAddress);
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const existingAddress = await this.addressRepository.findOne({
      where: { id },
    });
    if (!existingAddress) return null;
    const updatedAddress = Object.assign(existingAddress, updateAddressDto);
    return this.addressRepository.save(updatedAddress);
  }

  async delete(id: number): Promise<{ affected: number }> {
    const deleteResult = await this.addressRepository.delete(id);
    return { affected: deleteResult.affected ?? 0 };
  }
}
