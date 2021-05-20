import {
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { log } from 'console';
import { ValidationErrorItem } from 'sequelize';

export abstract class AbstractEntityRepository<T> {
  constructor(public readonly model) {}

  // create(data) {
  //   return this.model.create(data);
  // }
  create: (data) => Promise<T> = (data) => {
    return this.model.create(data).catch(this._errorHandler);
  };

  async _errorHandler(err) {
    if (err.parent.code == 23505) {
      throw new ConflictException('phone number or email is already exist');
    }
    throw new InternalServerErrorException();
  }
}
