import { HomeModule } from './application/home/home.module';
import { AuthModule } from './application/auth/auth.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, AuthModule, HomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
