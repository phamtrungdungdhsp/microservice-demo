import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EVENT } from 'src/microsevice/constants/event.constant';
import { TOPICS } from 'src/microsevice/constants/topic.constant';
import { ProducerService } from 'src/microsevice/services/producer.service';

@Controller('feature')
export class FeatureController {
  constructor(private producerService: ProducerService) {}

  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.producerService.send(EVENT.getUser, { email });
  }

  @MessagePattern(TOPICS.calulation)
  calculation(@Payload() message: any) {
    console.log(message)
    const result = Math.random();
    console.log(`Calulation for user ${message.id}: ${result}`);
    return result;
  }
}
