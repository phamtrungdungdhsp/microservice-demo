import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import * as crypto from 'node:crypto';
import { ProducerService } from 'src/microsevice/services/producer.service';
import { EVENT } from 'src/microsevice/constants/event.constant';

@Injectable()
export class UserService {
  private users: UserEntity[];

  constructor(private producerService: ProducerService) {
    this.users = [];
  }

  async createUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    return new Promise((resolve) => {
      const existedUser = this.users.find((u) => u.email === email);
      if (existedUser) {
        throw new BadRequestException('Email is already taken');
      }
      const user = new UserEntity();
      user.id = crypto.randomBytes(64).toString('hex').substring(0, 16);
      user.email = email;
      user.password = password;
      this.users.push(user);

      return resolve({ id: user.id, email: user.email });
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((u) => u.email === email);
    return new Promise((resolve) => resolve(user));
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((u) => u.id === id);
    return new Promise((resolve) => resolve(user));
  }

  async getUserHandsomeRate(user: any) {
    const result = await this.producerService.send(EVENT.calulation, {
      id: user.sub,
    });
    return result;
  }
}
