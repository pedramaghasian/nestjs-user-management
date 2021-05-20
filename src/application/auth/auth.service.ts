import { RegisterDto } from './../../domain/dto/register.dto';
import { UserRepository } from './../../infrastructure/database/postgres/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PrivateKeyInput } from 'crypto';
import { User } from 'src/infrastructure/database/postgres/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  create(data: RegisterDto) {
    return this.userRepository.createUser(data);
  }
}
