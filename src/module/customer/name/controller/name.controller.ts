// /module/customer/name/controller/name.controller.ts
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
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { CreateNameDto } from '../dto/create-name.dto';
import { UpdateNameDto } from '../dto/update-name.dto';
import { NameService } from '../service/name.service';
import { NameChangeLogInterceptor } from '../../name-change-log/interceptor/name-change-log-interceptor';
import { User } from '../../../../decorator/user/user.decorator';

@Controller('customer/name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Get()
  @SetMetadata('isPublic', true)
  async getAllNames() {
    try {
      const names = await this.nameService.getAllNames();
      return { success: true, data: names };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch names',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getNameById(@Param('id') id: number) {
    try {
      const name = await this.nameService.getNameById(id);
      if (!name)
        throw new HttpException('Name not found', HttpStatus.NOT_FOUND);
      return { success: true, data: name };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createName(@Body() createNameDto: CreateNameDto) {
    try {
      const newName = await this.nameService.createName(createNameDto);
      return { success: true, data: newName };
    } catch (error) {
      throw new HttpException(
        'Failed to create name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseInterceptors(NameChangeLogInterceptor)
  @Patch(':id')
  async updateName(
    @Param('id') id: number,
    @Body() updateNameDto: UpdateNameDto,
    @User() user: any,
  ) {
    try {
      const updatedName = await this.nameService.updateName(id, updateNameDto);
      if (!updatedName)
        throw new HttpException('Name not found', HttpStatus.NOT_FOUND);
      return { success: true, data: updatedName }; // Return user for demonstration
    } catch (error) {
      throw new HttpException(
        'Failed to update name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteName(@Param('id') id: number) {
    try {
      await this.nameService.deleteName(id);
      return { success: true, message: 'Name deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
