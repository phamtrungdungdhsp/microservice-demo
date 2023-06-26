import { Transport, KafkaOptions } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'my-service',
      brokers: ['127.0.0.1:29092'],
    },
    consumer: {
      groupId: 'authentication',
      allowAutoTopicCreation: true,
      retry: { retries: 5 },
    },
  },
};
