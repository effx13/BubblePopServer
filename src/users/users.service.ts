import { PostSignupDTO } from './../auth/dto/post-signupDTO';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(userId: string): Promise<any> {
    return this.prismaService.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async create(data: PostSignupDTO): Promise<any> {
    return this.prismaService.user.create({
      data,
    });
  }
}
