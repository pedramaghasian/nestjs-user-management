import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Home')
@Controller('home')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
export class HomeController {
  @Get()
  @ApiOperation({ summary: 'Home Page' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  homePage() {
    return 'You Logged In Now!!';
  }
}
