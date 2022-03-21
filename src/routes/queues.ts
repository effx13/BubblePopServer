import { Queue } from '../models';
import express from 'express';
import { v4 } from 'uuid';

const router = express.Router();

// Get Queue list by Name, UUID
router.get('/', (req, res) => {
  if (!req.query.uuid && !req.query.name) {
    Queue.find()
      .sort({ reservation: 1 })
      .then((queue: string | any[]) => {
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
          error: e,
        });
      });
  } else if (req.query.uuid) {
    Queue.find({ uuid: req.query.uuid })
      .then((queue) => {
        res.send({
          staus: 'Success',
          queue,
        });
      })
      .catch((e) => {
        res.status(404).send({
          status: 'Error',
          error: e,
        });
      });
  } else if (req.query.name) {
    Queue.find({ name: req.query.name })
      .then((queue) => {
        res.send({
          staus: 'Success',
          queue,
        });
      })
      .catch((e) => {
        res.status(404).send({
          status: 'Error',
          error: e,
        });
      });
  }
});

// Get Queue Count
router.get('/count', (req, res) => {
  Queue.find()
    .sort({ reservation: 1 })
    .then((queue: string | any[]) => {
      res.send({
        status: 'Success',
        count: queue.length,
      });
    })
    .catch((e) => {
      res.status(500).send({
        status: 'Error',
        error: e,
      });
    });
});

// Create new Document
router.post('/', (req, res) => {
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
      res.status(500).send({
        status: 'Error',
        error: e,
      });
    });
});

export default router;
