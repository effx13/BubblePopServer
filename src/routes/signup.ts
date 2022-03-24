import express from 'express';
import { User } from '../models/UsersModel';
import { createHashedPassword } from '../utils/encrypt';

const router = express.Router();

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
        user,
      });
    })
    .catch((e) => {
      res.status(500).send({
        status: 'Error',
        error: e,
      });
    });
});

export default router;
