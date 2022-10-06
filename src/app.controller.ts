import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PostSignupDTO } from './auth/dto/post-signupDTO';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req, @Res({ passthrough: true }) response: Response) {
    response.cookie('jwt', await this.authService.login(req));
    return { status: true };
  }

  @Post('auth/signup')
  async signup(@Body() req: PostSignupDTO) {
    return this.authService.signup(req);
  }
}
