import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from './metrics.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { requestsCounterConfig } from './requests-counter.config';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    makeCounterProvider(requestsCounterConfig),
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
  exports: [],
})
export class Metrics {}
