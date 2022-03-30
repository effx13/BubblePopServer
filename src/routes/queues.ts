import { verifyToken } from '@src/middleware/verifytoken';
import { Queue } from '@src/models';
import { logger } from '@src/utils/logger';
import express from 'express';
import { v4 } from 'uuid';

const router = express.Router();

// Get Queue list by Name or UUID
router.get('/', (req, res) => {
  if (!req.query.uuid && !req.query.name) {
    Queue.find()
      .sort({ reservation: 1 })
      .then((queue) => {
        if (!queue.length)
          return res.status(404).send({
            status: 'Error',
            Error: 'Queue not found',
          });
        res.send({
          status: 'Success',
          queue,
        });
      })
      .catch((e) => {
        res.status(404).send({
          status: 'Error',
          error: 'Unexpected Error',
        });
        logger.error(e);
      });
  } else if (req.query.uuid) {
    Queue.find({ uuid: req.query.uuid })
      .then((queue) => {
        res.send({
          status: 'Success',
          queue,
        });
      })
      .catch((e) => {
        res.status(404).send({
          status: 'Error',
          error: 'Unexpected Error',
        });
        logger.error(e);
      });
  } else if (req.query.name) {
    Queue.find({ name: req.query.name })
      .then((queue) => {
        res.send({
          status: 'Success',
          queue,
        });
      })
      .catch((e) => {
        res.status(404).send({
          status: 'Error',
          error: 'Unexpected Error',
        });
        logger.error(e);
      });
  }
});

// Get Queue Count
router.get('/count', (req, res) => {
  Queue.find()
    .sort({ reservation: 1 })
    .then((queue) => {
      res.send({
        status: 'Success',
        count: queue.length,
      });
    })
    .catch((e) => {
      res.status(500).send({
        status: 'Error',
        error: 'Unexpected Error',
      });
      logger.error(e);
    });
});

// Create new Document
router.post('/', verifyToken, (req, res) => {
  Queue.create({
    name: req.body.name,
    isPayed: req.body.isPayed,
    uuid: v4(),
    reservation: req.body.reservation,
  })
    .then((queue) =>
      res.send({
        status: 'Success',
        queue,
      }),
    )
    .catch((e) => {
      if (e.keyPattern.name) {
        res.status(409).send({
          status: 'Error',
          error: 'Existing Name',
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
