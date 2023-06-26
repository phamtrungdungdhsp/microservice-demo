import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  registerUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.createUser(email, password);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user: UserEntity | null = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Email or Password is invalid');
    }
    if (user.password !== password) {
      throw new BadRequestException('Email or Password is invalid');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  validateUser(userId: string) {
    return this.userService.findById(userId);
  }
}
