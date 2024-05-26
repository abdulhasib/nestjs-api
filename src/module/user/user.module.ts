import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { MiddlewareModule } from '../../middleware/middleare.module';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => MiddlewareModule),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
