import { MailService } from './../mail/mail.service';
import { RegisterDto } from '../../domain/dto/auth/register.dto';
import { UserRepository } from './../../infrastructure/database/postgres/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { Bcrypt } from 'src/shared/helper/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/domain/dto/auth/changePassword.dto';
import { ForgotPasswordDto } from 'src/domain/dto/auth/forgotPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.userRepository.findOneUser({ email: data.email });

    if (!user) throw new UnauthorizedException('user not found');

    const verificationCode = await Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const expirationDate = now.setMinutes(now.getMinutes() + 5);

    await this.userRepository.updateUser(
      { expirationDate, verificationCode },
      { email: user.email },
    );
    // await this.mailService.sendUserConfirmation(
    //   user,
    //   verificationCode.toString(),
    // );

    return { VerificationCode: verificationCode };
  }

  async changePassword(data: ChangePasswordDto): Promise<string> {
    const user = await this.userRepository.findOneUser({ email: data.email });

    if (!user) throw new UnauthorizedException('user ni');

    if (user.verificationCode != data.verificationCode) {
      throw new UnauthorizedException('Invalid verification code');
    }

    if (!(new Date(+user.expirationDate) > new Date()))
      throw new UnauthorizedException(' expire shode dadash');

    if (data.confirmPassword !== data.password)
      throw new UnauthorizedException('passworda nemikhonne');

    const hashedPassword = await Bcrypt.hashPassword(data.password);
    await this.userRepository.updateUser(
      {
        password: hashedPassword,
        verificationCode: null,
        expirationDate: null,
      },
      { email: data.email },
    );

    return 'success';
  }
}
