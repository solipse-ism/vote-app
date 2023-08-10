import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TopicService } from './topic/topic.service';
import { TopicController } from './topic/topic.controller';
import { VoteController } from './vote/vote.controller';
import { VoteService } from './vote/vote.service';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'password',
          database: 'voting_application',
        },
      },
    }),
  ],
  controllers: [AppController, UsersController, TopicController, VoteController],
  providers: [AppService, UsersService, TopicService, VoteService],
})
export class AppModule {}
