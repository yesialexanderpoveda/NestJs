import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/entyties/message.entity';
import { MessageService } from './messages/message.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'nest',
      password: 'app',
      database: 'sendmeapp_db',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
     TypeOrmModule.forFeature([Message]) 
  ],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessageService],
})
export class AppModule {}
