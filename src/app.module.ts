import { HomeModule } from './application/home/home.module';
import { AuthModule } from './application/auth/auth.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    InfrastructureModule,
    AuthModule,
    HomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
