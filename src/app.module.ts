import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import * as db from './config/db.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [
        './src/environments/.env.dev',
        './src/environments/.env.prod',
        './src/environments/.env.uat',
      ],
    }),
    TypeOrmModule.forRoot({
      type: db.DATABASE_TYPE,
      host: db.DATABASE_HOST,
      port: 5432,
      username: db.DATABASE_USERNAME,
      password: db.DATABASE_PASSWORD,
      database: db.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
