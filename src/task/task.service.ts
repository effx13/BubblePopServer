import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron('* * * * * *')
  async handleCron() {
    await this.prismaService.queue.deleteMany({
      where: {
        reservationTime: {
          lte: new Date(),
        },
      },
    });
  }
}
