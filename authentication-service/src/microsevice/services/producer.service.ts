import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export class ProducerService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientKafka) {}

  async send(topicName: string, data: any) {
    const res = this.client.send(topicName, data);
    return new Promise((resolve) => res.subscribe((value) => resolve(value)));
  }
}
