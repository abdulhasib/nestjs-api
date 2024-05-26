import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressService } from '../service/address.service';

@Controller('customer/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddresss() {
    try {
      const addresss = await this.addressService.getAllAddresss();
      return { success: true, data: addresss };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch addresss',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getAddressById(@Param('id') id: number) {
    try {
      const address = await this.addressService.getAddressById(id);
      if (!address)
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      return { success: true, data: address };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    try {
      const newAddress =
        await this.addressService.createAddress(createAddressDto);
      return { success: true, data: newAddress };
    } catch (error) {
      throw new HttpException(
        'Failed to create address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateAddress(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      const updatedAddress = await this.addressService.updateAddress(
        id,
        updateAddressDto,
      );
      if (!updatedAddress)
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      return { success: true, data: updatedAddress };
    } catch (error) {
      throw new HttpException(
        'Failed to update address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: number) {
    try {
      await this.addressService.deleteAddress(id);
      return { success: true, message: 'Address deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete address',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
