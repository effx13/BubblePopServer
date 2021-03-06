import { Document, model, Model, Schema } from 'mongoose';

// Queue Interface
interface IQueue {
  name: string;
  isPayed: Boolean;
  uuid: string;
  queuedAt: Date;
  reservation: Date;
}

// Queue Schema
const QueueSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    isPayed: {
      type: Boolean,
      required: true,
    },
    uuid: {
      type: String,
      unique: true,
      required: true,
    },
    queuedAt: {
      type: Number,
      default: Date.now,
    },
    reservation: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'Queue',
    versionKey: false,
  },
);

interface IQueueDoc extends IQueue, Document {
  create: () => Promise<void>;
}

interface IQueueModel extends Model<IQueueDoc> {
  findAll: () => Promise<void>;
}

const Queue = model<IQueueDoc, IQueueModel>('Queue', QueueSchema);
export { Queue, IQueue };
