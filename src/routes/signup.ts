import { User } from '@src/models/UsersModel';
import { createHashedPassword } from '@src/utils';
import express from 'express';

const router = express.Router();

// Create User
router.post('/', (req, res, next) => {
  User.create({
    userid: req.body.userid,
    pw: createHashedPassword(req.body.pw),
    description: req.body.description,
    nickname: req.body.nickname,
  })
    .then((user) => {
      res.send({
        status: 'Success',
        message: `Successfully signup, ${user.userid}`,
      });
    })
    .catch((e) => {
      if (e.keyPattern.userid) {
        next({ name: 'ExistID' });
      } else if (e.keyPattern.nickname) {
        next({ name: 'ExistNickname' });
      } else {
        next({ name: 'Error' });
      }
    });
});

export default router;
