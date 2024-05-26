import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return { success: true, data: users };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      console.log(11);
      const user = await this.userService.getUserById(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     const newUser = await this.userService.createUser(createUserDto);
  //     return { success: true, data: newUser };
  //   } catch (error) {
  //     throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @UseInterceptors(UserChangeLogInterceptor)
  // @Patch(':id')
  // async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   try {
  //     const updatedUser = await this.userService.updateUser(id, updateUserDto);
  //     if (!updatedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     return { success: true, data: updatedUser };
  //   } catch (error) {
  //     throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: number) {
  //   try {
  //     await this.userService.deleteUser(id);
  //     return { success: true, message: 'User deleted successfully' };
  //   } catch (error) {
  //     throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
