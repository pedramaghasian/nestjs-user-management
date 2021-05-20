import { RegisterDto } from '../../domain/dto/auth/register.dto';
import { UserRepository } from './../../infrastructure/database/postgres/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { Bcrypt } from 'src/shared/helper/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  register(data: RegisterDto) {
    return this.userRepository.createUser(data);
  }

  async login(data): Promise<{ token: string }> {
    const user = await this.userRepository.findOneUser({ email: data.email });
    if (!user) throw new UnauthorizedException('Invalid cridential');
    const isMatch = await Bcrypt.comparePassword(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid cridential');
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  whoami(user: User): User {
    return user;
  }
}
