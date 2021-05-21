import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/postgres/models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      port: 5432,
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      dialect: 'postgres',
      autoLoadModels: true,
      models: [User],
    }),
  ],
})
export class InfrastructureModule {}
