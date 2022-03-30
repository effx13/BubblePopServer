import dotenv from 'dotenv';
import * as express from 'express';
import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';

dotenv.config();
const secretKey = process.env.SECRET as string;

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  var token = req.cookies.user;
  if (token === undefined) {
    res.status(401).send({
      status: 'Error',
      error: 'Not logged in',
    });
  } else {
    jsonwebtoken.verify(token, secretKey, (error: VerifyErrors | null) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(419).json({
            status: 'Error',
            error: 'Login Expired',
          });
        } else {
          return res.status(410).json({
            status: 'Error',
            error: 'Login Error',
          });
        }
      } else {
        next();
      }
    });
  }
};

export { verifyToken };
