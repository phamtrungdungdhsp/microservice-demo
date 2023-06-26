import { Transport, KafkaOptions } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'my-service',
      brokers: ['localhost:29092'],
    },
    consumer: {
      groupId: 'feature',
      allowAutoTopicCreation: true,
      retry: { retries: 5 },
    },
  },
};
