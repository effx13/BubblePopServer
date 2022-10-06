import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QueueService {
  constructor(private readonly prismaService: PrismaService) {}

  async getQueues() {
    return this.prismaService.queue.findMany({
      select: {
        name: true,
        createdAt: true,
        reservationTime: true,
      },
    });
  }

  async getQueueCount() {
    return { count: await this.prismaService.queue.count() };
  }

  async createQueue(query) {
    return this.prismaService.queue.create({
      data: {
        name: query.name,
        reservationTime: query.reservationTime,
      },
    });
  }
}
