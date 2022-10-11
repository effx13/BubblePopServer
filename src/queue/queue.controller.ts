import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('/data')
  async getQueue() {
    return this.queueService.getQueues();
  }

  @Get('/count')
  async getQueueCount() {
    return this.queueService.getQueueCount();
  }

  @Post('/create')
  async createQueue(@Body() query) {
    return this.queueService.createQueue(query);
  }
}
