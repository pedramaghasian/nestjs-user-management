import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/infrastructure/database/postgres/models/user.model';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
