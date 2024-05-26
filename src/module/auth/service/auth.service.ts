import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entity/user.entity';
import { TokenEntity } from '../entity/token.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    await this.tokenRepository.save({ user, refresh_token: refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { refresh_token: refreshToken },
      relations: ['user'],
    });
    if (!tokenEntity) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = {
      sub: tokenEntity.user.id,
      username: tokenEntity.user.username,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private generateRefreshToken(): string {
    return [...Array(30)].map(() => Math.random().toString(36)[2]).join(''); // Simple random string generator
  }
}
