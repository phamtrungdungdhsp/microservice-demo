import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroseviceModule } from './microsevice/microservice.module';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [MicroseviceModule, FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
