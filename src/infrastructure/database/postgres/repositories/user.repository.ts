import { RegisterDto } from './../../../../domain/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { AbstractEntityRepository } from '../../base_db/AbstractEntity.repository';

@Injectable()
export class UserRepository extends AbstractEntityRepository<User> {
  constructor(public sequelize: Sequelize) {
    super(sequelize.model('User'));
  }

  createUser(data: RegisterDto) {
    return this.create(data);
  }
}
