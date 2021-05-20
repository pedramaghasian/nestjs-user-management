import { JwtStrategy } from './../../shared/passport/jwt.strategy';
import { UserRepository } from './../../infrastructure/database/postgres/repositories/user.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'myVeryTopSecret*&^%$45AS!@#1648987/',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [UserRepository, JwtStrategy, PassportModule],
})
export class AuthModule {}
