// src/types/express.d.ts
// extend the Request interface to recognize the user
import { User as UserType } from '../module/user/entity/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
