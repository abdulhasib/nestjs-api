import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users) throw new Error('No users found.');
    return users;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) return null;
    throw new Error('No users found.');
    const updatedUser = Object.assign(existingUser, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async delete(id: number): Promise<{ affected: number }> {
    const deleteResult = await this.userRepository.delete(id);
    return { affected: deleteResult.affected ?? 0 };
  }
}
