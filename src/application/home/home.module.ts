import { AuthModule } from './../auth/auth.module';
import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
  controllers: [HomeController],
  providers: [],
})
export class HomeModule {}
