import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from '../services/user.service';
import { Request } from 'express';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { TOPICS } from 'src/microsevice/constants/topic.constant';

@Controller({ path: 'user' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  calculation(@Req() req: Request) {
    const user = req['user'];
    return this.userService.getUserHandsomeRate(user);
  }

  @MessagePattern(TOPICS.getUser)
  async getUserInformation(@Payload() message: any) {
    const user = await this.userService.findByEmail(message.email);
    console.log(
      `Find user with email ${message.email}: ${
        user ? JSON.stringify(user) : null
      }`,
    );
    return JSON.stringify(user);
  }
}
