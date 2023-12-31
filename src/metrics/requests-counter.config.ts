import { CounterConfiguration } from 'prom-client';

export const requestsCounterName = 'http_requests_total';

export const requestsCounterConfig: CounterConfiguration<string> = {
  name: requestsCounterName,
  help: 'Total number of HTTP requests by method, path and status code',
  labelNames: ['method', 'path', 'status'],
};
