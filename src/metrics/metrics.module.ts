import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from './metrics.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { requestsCounterConfig } from './requests-counter.config';
import { memoryGaugeConfig } from './memory-gauge.config';
import { MetricsService } from './metrics.service';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    makeCounterProvider(requestsCounterConfig),
    makeGaugeProvider(memoryGaugeConfig),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
    MetricsService,
  ],
  exports: [],
})
export class MetricsModule {}
