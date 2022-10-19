import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QueueService } from './queue/queue.service';
import { QueueController } from './queue/queue.controller';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';

@Module({
  imports: [AuthModule, UsersModule, ScheduleModule.forRoot()],
  controllers: [AppController, QueueController],
  providers: [AppService, QueueService, PrismaService, TaskService],
})
export class AppModule {}
