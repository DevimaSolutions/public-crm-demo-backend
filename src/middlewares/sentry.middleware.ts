import { Handlers } from '@sentry/node';

const sentryHandler = Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture all 404 and 500 errors
    if (error.status === 404 || error.status === 500) {
      return true;
    }

    return false;
  },
});

export default sentryHandler;
