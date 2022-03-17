import { Queue } from '@src/models';
import express from 'express';

const router = express.Router();

// Find All and Sort By QueuedAt
router.get('/', (req, res) => {
  Queue.find()
    .sort({ queuedAt: 1 })
    .then((queue: string | any[]) => {
      if (!queue.length) return res.status(404).send({ e: 'Queue not found' });
      res.send(queue);
    })
    .catch((e: any) => res.status(500).send(e));
});

// Create new Document
router.post('/', (req, res) => {
  Queue.create(req.body)
    .then((queue) => res.send(queue))
    .catch((err) => res.status(500).send(err));
});

export default router;
