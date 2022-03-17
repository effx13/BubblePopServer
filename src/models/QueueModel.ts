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
      required: true,
    },
    isPayed: {
      type: Boolean,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    queuedAt: {
      type: Number,
      default: Date.now,
    },
    reservation: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

interface IQueueDoc extends IQueue, Document {
  create: (uuid: string) => Promise<void>;
}

interface IQueueModel extends Model<IQueueDoc> {
  findAll: () => Promise<void>;
  findByToken: (token: string, secret_key: any) => Promise<void>;
}

const Queue = model<IQueueDoc, IQueueModel>('User', QueueSchema);
export { Queue, IQueue };
