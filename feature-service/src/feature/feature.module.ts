import { Module } from '@nestjs/common';
import { FeatureController } from './controller/feature.controller';

@Module({
  controllers: [FeatureController],
})
export class FeatureModule {}
