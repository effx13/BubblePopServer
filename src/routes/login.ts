import { User } from '@src/models/UsersModel';
import { createHashedPassword } from '@src/utils';
import { logger } from '@src/utils';
import dotenv from 'dotenv';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';

// Get Environment form .env
dotenv.config();
const secretKey = process.env.SECRET as string;

const router = express.Router();

// Return login cookie
router.get('/', (req, res) => {
  User.find({
    userid: req.body.userid,
    pw: createHashedPassword(req.body.pw),
  })
    .then((user) => {
      if (user.length === 0) {
        throw new Error('Invalid ID or PW');
      } else {
        const expiryDate = new Date(Date.now() + 1000 * 60 * 60); // 1 Hour
        const token = jsonwebtoken.sign(
          {
            user_id: user[0].userid,
          },
          secretKey,
          {
            expiresIn: '1h',
          },
        );
        res.cookie('user', token, {
          httpOnly: true,
          path: '/',
          expires: expiryDate,
        });
        res.send({
          status: 'Success',
        });
      }
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
