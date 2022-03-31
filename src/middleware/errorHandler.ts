import { logger } from '@src/utils';
import * as express from 'express';

declare global {
  namespace Express {
    interface Errback {
      name?: string;
      errorBody?: any;
    }
  }
}

const notFoundErrorHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(404).send({
    status: 'Error',
    error: 'Not Found',
  });
  next();
};

const errorHandler = (
  err: express.Errback,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.log(err.name);
  switch (err.name) {
    case 'ExistID':
      res.status(409).send({
        status: 'Error',
        error: 'Existing ID',
      });
      break;
    case 'ExistNickname':
      res.status(409).send({
        status: 'Error',
        error: 'Existing Nickname',
      });
      break;
    default:
      break;
  }
};

export { notFoundErrorHandler, errorHandler };
