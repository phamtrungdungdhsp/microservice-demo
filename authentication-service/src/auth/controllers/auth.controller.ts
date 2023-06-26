import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  registerUser(@Body() body: { email: string; password: string }) {
    return this.authService.registerUser(body.email, body.password);
  }

  @Post('sign-in')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
