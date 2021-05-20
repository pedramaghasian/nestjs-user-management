import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/postgres/models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      port: 5432,
      host: 'localhost',
      username: 'admin',
      password: 'admin123456',
      database: 'user_management',
      dialect: 'postgres',
      autoLoadModels: true,
      models: [User],
    }),
  ],
})
export class InfrastructureModule {}
