// src/module/customer/name-change-log/interceptor/name-change-log.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NameChangeLogService } from '../service/name-change-log.service';
import { NameService } from '../../name/service/name.service';

@Injectable()
export class NameChangeLogInterceptor implements NestInterceptor {
  constructor(
    private readonly nameChangeLogService: NameChangeLogService,
    private readonly nameService: NameService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const customerNameId = +request.params.id;
    const user = request.user;

    const existingName = await this.nameService.getNameById(customerNameId);
    return next.handle().pipe(
      tap(async () => {
        const updatedName = await this.nameService.getNameById(customerNameId);
        const fieldname = Object.getOwnPropertyNames(request.body)[0];

        if (existingName[fieldname] === updatedName[fieldname]) return;

        const data = {
          fieldname,
          previousValue: existingName[fieldname],
          updatedValue: updatedName[fieldname],
        };

        this.nameChangeLogService.createNameChangeLog({
          customer_name_id: customerNameId,
          user_id: user.id,
          data,
        });
      }),
    );
  }
}
