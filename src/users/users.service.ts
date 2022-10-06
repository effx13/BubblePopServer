import { PostSignupDTO } from './../auth/dto/post-signupDTO';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async isExist(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async findOne(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async create(data: PostSignupDTO) {
    return this.prismaService.user.create({
      data,
    });
  }
}
