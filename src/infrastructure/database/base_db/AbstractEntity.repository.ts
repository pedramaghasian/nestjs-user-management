import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export abstract class AbstractEntityRepository<T> {
  constructor(public readonly model) {}

  create(data): Promise<T> {
    return this.model.create(data).catch(this._errorHandler);
  }

  findOne(criteria): Promise<T> {
    return this.model.findOne({ where: criteria }).catch(this._errorHandler);
  }

  update(data, criteria): Promise<T> {
    return this.model
      .update(data, { where: criteria })
      .catch(this._errorHandler);
  }

  async _errorHandler(err) {
    if (err.parent?.code == 23505) {
      throw new ConflictException('phone number or email is already exist');
    }
    throw new InternalServerErrorException();
  }
}
