import {
  Inject,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  Global,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';
import { ProducerService } from './services/producer.service';
import { EVENT } from './constants/event.constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        ...microserviceConfig,
      },
    ]),
  ],
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class MicroseviceModule implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('AUTH_SERVICE') private client: ClientKafka) {}
  async onModuleInit() {
    Object.values(EVENT).forEach((event) =>
      this.client.subscribeToResponseOf(event),
    );
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
