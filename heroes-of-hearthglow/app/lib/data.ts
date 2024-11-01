import { connect } from './dbconnect';
import mongoose, { InferSchemaType, Model } from 'mongoose';
import { NewsSchema } from './schemas';
import { UserSchema } from './schemas';

type GA4AnalyticsData = {
  rows: Array<{
    dimensionValues: Array<{
      value: string;
    }>;
    metricValues: Array<{
      value: string;
    }>;
  }>;
};

export const News: Model<InferSchemaType<typeof NewsSchema>> =
  mongoose.models.News || mongoose.model('News', NewsSchema);

export const User: Model<InferSchemaType<typeof UserSchema>> =
  mongoose.models.User || mongoose.model('User', UserSchema);

export async function fetchAnalyticsData(
  url: string
): Promise<GA4AnalyticsData> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}. Status: ${res.status}`);
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}


