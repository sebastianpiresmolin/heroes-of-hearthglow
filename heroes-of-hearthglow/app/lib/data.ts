import { connect } from './dbconnect';
import mongoose, { InferSchemaType, Model } from 'mongoose';
import { NewsSchema } from './schemas';

export const News: Model<InferSchemaType<typeof NewsSchema>> =
  mongoose.models.News || mongoose.model('News', NewsSchema);

export async function getLatestNews() {
  // Check if already connected (readyState 1)
  if (mongoose.connection.readyState !== 1) {
    try {
      await connect(); // Attempt to connect
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed', error);
      throw new Error('Failed to connect to the database');
    }
  }

  // Proceed with the query
  return News.find().sort({ id: -1 }).limit(1);
}
