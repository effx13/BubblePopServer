import { Queue } from '@src/models';
import express from 'express';

const router = express.Router();

// Find All and Sort By Reservation
router.get('/', (req, res) => {
  Queue.find()
    .sort({ reservation: 1 })
    .then((queue: string | any[]) => {
      if (!queue.length) return res.status(404).send({ Error: 'Queue not found' });
      res.send(queue);
    })
    .catch((e: any) => res.status(500).send(e));
});

// Get Queue Count
router.get('/count', (req, res) => {
  Queue.find()
    .sort({ reservation: 1 })
    .then((queue: string | any[]) => {
      res.send({
        count: queue.length,
      });
    })
    .catch((e: any) => res.status(500).send(e));
});

// Create new Document
router.post('/', (req, res) => {
  Queue.create(req.body)
    .then((queue) => res.send(queue))
    .catch((e) => res.status(500).send(e));
});

export default router;
