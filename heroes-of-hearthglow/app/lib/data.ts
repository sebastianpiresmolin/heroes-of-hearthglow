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

export async function fetchAnalyticsData(params: { startDate: string, endDate: string, metrics: string }) {
  const { startDate, endDate, metrics } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = new URL(`${baseUrl}/api/analytics?startDate=${startDate}&endDate=${endDate}&metrics=${metrics}`);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

