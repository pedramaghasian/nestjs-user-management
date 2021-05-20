import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { RegisterDto } from './../../domain/dto/register.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) data: RegisterDto) {
    return this.authService.create(data);
  }
}
