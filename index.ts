import { Handlers, init as sentryInit } from '@sentry/node';
import { json, raw, text, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import formData from 'express-form-data';
import mongoose from 'mongoose';

import { sentryConfigs } from '@configs';
import { sentryMiddleware } from '@middlewares';
import { ClientError } from '@models';
import { errorResponseHandler } from '@responses';
import routesV1 from '@routes/v1';
import { env } from '@utils';

const app = express();

if (env.useCors) {
  app.use(cors());
}

sentryInit({
  dsn: sentryConfigs.dsn,
  integrations: sentryConfigs.integrations,
  tracesSampleRate: sentryConfigs.tracesSampleRate,
});

app.use(Handlers.requestHandler());
app.use(Handlers.tracingHandler());

app.use(json());
app.use(raw());
app.use(text());
app.use(express.json({ limit: '8000kb' }));
app.use(urlencoded({ extended: true }));

mongoose.connect(
  env.connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('> Connected to db');
  },
);

app.use('/v1', routesV1);
app.use(formData.parse());
app.use('/uploads', express.static(`${__dirname}/uploads`));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ClientError) {
    res
      .status(error.status || 400)
      .json(errorResponseHandler.getClientErrorResponse(error));

    return;
  }

  res.status(500).json(errorResponseHandler.getServerErrorResponse(error));
});
app.use(sentryMiddleware);

const port = env.port;
app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
});
