import { RegisterDto } from '../../../../domain/dto/auth/register.dto';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { AbstractEntityRepository } from '../../base_db/AbstractEntity.repository';

@Injectable()
export class UserRepository extends AbstractEntityRepository<User> {
  constructor(public sequelize: Sequelize) {
    super(sequelize.model('User'));
  }

  createUser(data: RegisterDto): Promise<User> {
    return this.create(data);
  }

  findOneUser(criteria): Promise<User> {
    return this.findOne(criteria);
  }

  updateUser(data, criteria): Promise<User> {
    return this.update(data, criteria);
  }
}
