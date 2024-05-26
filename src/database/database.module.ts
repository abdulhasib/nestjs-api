import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NameEntity } from '../module/customer/name/entity/name.entity';
import { AddressEntity } from '../module/customer/address/entity/address.entity';
import { NameChangeLogEntity } from '../module/customer/name-change-log/entity/name-change-log.entity';
import { UserEntity } from '../module/user/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'customer',
      entities: [NameEntity, AddressEntity, NameChangeLogEntity, UserEntity],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
