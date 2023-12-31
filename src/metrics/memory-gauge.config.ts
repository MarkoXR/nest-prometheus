import { GaugeConfiguration } from 'prom-client';

export const memoryGaugeName = 'heap_memory_usage_bytes';

export const memoryGaugeConfig: GaugeConfiguration<string> = {
  name: memoryGaugeName,
  help: 'Heap memory usage in bytes',
};
