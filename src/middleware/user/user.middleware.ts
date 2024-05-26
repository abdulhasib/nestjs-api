// src/middleware/user/user.middleware.ts
import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../module/user/service/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['user-id'] === undefined)
      throw new HttpException('User ID not provided', HttpStatus.UNAUTHORIZED);

    const userId = Number(req.headers['user-id']);

    if (isNaN(userId))
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    req.user = user; // Attach user to the request object

    next();
  }
}
