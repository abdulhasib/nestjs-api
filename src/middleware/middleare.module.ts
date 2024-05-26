// /middleware/middleware.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserMiddleware } from './user/user.middleware';
import { UserModule } from '../module/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserMiddleware],
  exports: [UserMiddleware],
})
export class MiddlewareModule {}
