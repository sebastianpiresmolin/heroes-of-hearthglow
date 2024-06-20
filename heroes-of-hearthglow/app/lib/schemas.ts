import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  time: { type: String, required: true },
});

export const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
