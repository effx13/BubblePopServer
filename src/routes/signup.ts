import { User } from '@src/models/UsersModel';
import { createHashedPassword } from '@src/utils';
import { logger } from '@src/utils';
import express from 'express';

const router = express.Router();

// Create User
router.post('/', (req, res) => {
  User.create({
    userid: req.body.userid,
    pw: createHashedPassword(req.body.pw),
    description: req.body.description,
    nickname: req.body.nickname,
  })
    .then((user) => {
      res.send({
        status: 'Success',
      });
    })
    .catch((e) => {
      if (e.keyPattern.userid) {
        res.status(409).send({
          status: 'Error',
          error: 'Existing ID',
        });
      } else if (e.keyPattern.nickname) {
        res.status(409).send({
          status: 'Error',
          error: 'Existing Nickname',
        });
      } else {
        res.status(500).send({
          status: 'Error',
          error: 'Unexpected Error',
        });
      }
      logger.error(e);
    });
});

export default router;
