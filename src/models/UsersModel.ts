import { Document, model, Model, Schema } from 'mongoose';

// User Interface
interface IUser {
  userid: string;
  pw: string;
  nickname: string;
  description: string;
}

// User Schema
const UserSchema: Schema = new Schema(
  {
    userid: {
      type: String,
      unique: true,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      unique: true,
    },
    dsescription: {
      type: String,
    },
  },
  {
    collection: 'Users',
    versionKey: false,
  },
);

interface IUserDoc extends IUser, Document {
  create: () => Promise<void>;
}

interface IUserModel extends Model<IUserDoc> {
  findAll: () => Promise<void>;
}

const User = model<IUserDoc, IUserModel>('User', UserSchema);
export { User, IUser };
