import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Подключаем .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: config.get<string>('DB_HOST', 'localhost'),
      port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
      username: config.get<string>('DB_USERNAME', 'root'),
      password: config.get<string>('DB_PASSWORD', ''),
      database: config.get<string>('DB_DATABASE', ''),
      entities: [],
      synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
Ты установил пакет @nestjs/config — он позволяет читать переменные из .env файла.
В файле app.module.ts ты подключил ConfigModule и TypeOrmModule:
ConfigModule читает твой .env файл и делает переменные доступными в приложении.
TypeOrmModule настраивает подключение к MySQL, используя значения из .env.
Теперь твой backend может подключаться к базе данных, не храня пароли и адреса прямо в коде.
*/