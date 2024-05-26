import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserEntity } from '../user/entity/user.entity';
import { TokenEntity } from './entity/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repository/user.repository';
import { TokenRepository } from '../user/repository/token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(), // Import ConfigModule.forRoot() to load environment variables
  ],
  providers: [AuthService, JwtStrategy, UserRepository, TokenRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
