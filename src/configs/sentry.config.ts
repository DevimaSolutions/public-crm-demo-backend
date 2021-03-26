import { Integrations as NodeIntegrations } from '@sentry/node';
import { Integrations as IntegrationsTracing } from '@sentry/tracing';
import express from 'express';

const app = express();
const sentryConfig = {
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new NodeIntegrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new IntegrationsTracing.Express({ app }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1,
};
export default sentryConfig;
