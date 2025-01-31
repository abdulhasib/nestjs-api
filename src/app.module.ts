// app.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NameModule } from './module/customer/name/name.module';
import { AddressModule } from './module/customer/address/address.module';
import { NameChangeLogModule } from './module/customer/name-change-log/name-change-log.module';
import { UserModule } from './module/user/user.module';
import { MiddlewareModule } from './middleware/middleare.module';
import { UserMiddleware } from './middleware/user/user.middleware';

@Module({
  imports: [
    DatabaseModule,
    NameModule,
    AddressModule,
    NameChangeLogModule,
    UserModule,
    MiddlewareModule, // Ensure MiddlewareModule is imported
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );

        if (req.method === 'OPTIONS') {
          res.sendStatus(200);
        } else {
          next();
        }
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(UserMiddleware)
      .forRoutes({ path: '/customer/name/:id', method: RequestMethod.PATCH });
  }
}
