import { connect } from './dbconnect';
import mongoose, { InferSchemaType, Model } from 'mongoose';
import { NewsSchema } from './schemas';

connect();

export const News: Model<InferSchemaType<typeof NewsSchema>> =
  mongoose.models.News || mongoose.model('News', NewsSchema);


  export async function getLatestNews() {
    return News.find().sort({ id: -1 }).limit(1);
  }