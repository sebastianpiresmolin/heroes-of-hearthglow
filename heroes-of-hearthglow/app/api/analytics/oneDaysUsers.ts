import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('/api/analytics/oneDaysUsers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GA4AnalyticsData = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching one day users data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
