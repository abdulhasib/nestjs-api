// name-change-log.controller.ts

import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { NameChangeLogService } from '../service/name-change-log.service';

@Controller('customer/name-change-log')
export class NameChangeLogController {
  constructor(private readonly nameChangeLogService: NameChangeLogService) {}

  @Get('by-customer-name/:customerId') // Define the route with the subpath and parameter
  async getChangeLogsByCustomerId(@Param('customerId') customerId: number) {
    try {
      // Access the route parameter (customerId) and use it in your logic
      const changeLogs =
        await this.nameChangeLogService.getNameChangeLogsByCustomerId(
          customerId,
        );
      return { success: true, data: changeLogs };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
