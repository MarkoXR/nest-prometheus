import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

import { Gauge } from 'prom-client';
import { memoryGaugeName } from './memory-gauge.config';

@Injectable()
export class MetricsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MetricsService.name);

  constructor(@InjectMetric(memoryGaugeName) private memoryGauge: Gauge) {}

  public onApplicationBootstrap() {
    this.startMemoryGauge();
  }

  private startMemoryGauge() {
    setInterval(this.updateMemoryGauge.bind(this), 5000);
  }

  private updateMemoryGauge() {
    this.logger.log('Updating memory gauge');
    this.memoryGauge.set(process.memoryUsage().heapUsed);
  }
}
