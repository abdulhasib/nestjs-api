import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressEntity } from '../entity/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressRepository } from '../repository/address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAllAddresss(): Promise<AddressEntity[]> {
    return this.addressRepository.findAll();
  }

  async getAddressById(id: number): Promise<AddressEntity> {
    const Address = await this.addressRepository.findById(id);
    if (!Address) throw new NotFoundException('Address not found');
    return Address;
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressRepository.create(createAddressDto);
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const updatedAddress = await this.addressRepository.update(
      id,
      updateAddressDto,
    );
    if (!updatedAddress) throw new NotFoundException('Address not found');
    return updatedAddress;
  }

  async deleteAddress(id: number): Promise<void> {
    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Address not found');
  }
}
