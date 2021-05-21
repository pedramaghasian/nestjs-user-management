import { ResponseSerialization } from './../../shared/middleware/response-serialize.interceptor';
import { LoginDto } from './../../domain/dto/auth/login.dto';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { RegisterDto } from '../../domain/dto/auth/register.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ForgotPasswordDto } from 'src/domain/dto/auth/forgotPassword.dto';
import { ChangePasswordDto } from 'src/domain/dto/auth/changePassword.dto';

@ApiTags('Auth')
@ApiBearerAuth('JWT')
@UseInterceptors(
  new ResponseSerialization([
    'password',
    'expirationDate',
    'verificationCode',
    'updatedAt',
    'createdAt',
  ]),
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register(@Body() data: RegisterDto): Promise<User> {
    return this.authService.register(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  login(@Body() data: LoginDto): Promise<{ token: string }> {
    return this.authService.login(data);
  }

  @Post('whoami')
  @ApiOperation({ summary: 'Refresh the Authentication token ' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  whoami(@Req() req) {
    return this.authService.whoami(req?.user as User);
  }

  @Post('forgotPassword')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch('changePassword')
  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<string> {
    return this.authService.changePassword(changePasswordDto);
  }
}
