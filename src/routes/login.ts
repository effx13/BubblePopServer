import { createHashedPassword } from '../utils/encrypt';
import express from 'express';
import { User } from '../models/UsersModel';
import { logger } from '../utils/logger';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({
    userid: req.body.userid,
    pw: createHashedPassword(req.body.pw),
  })
    .then((user) => {
      if (user.length === 0) {
        throw new Error('Invalid ID or PW');
      }
      res.send({
        status: 'Success',
      });
    })
    .catch((e) => {
      res.status(500).send({
        status: 'Error',
        error: e.message,
      });
      logger.error(e);
    });
});

export default router;
