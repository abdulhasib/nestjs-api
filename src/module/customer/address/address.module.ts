import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './controller/address.controller';
import { AddressService } from './service/address.service';
import { AddressRepository } from './repository/address.repository';
import { AddressEntity } from './entity/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]), // Import the AddressEntity repository
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
