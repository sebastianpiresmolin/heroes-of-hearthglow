import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET(req: Request) {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  };

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: credentials,
  });

  const propertyId = `properties/${process.env.GOOGLE_GA4_PROPERTY_ID}`;

  try {
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [
        {
          startDate: '720daysAgo',
          endDate: '320daysAgo',
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'activeUsers' }],
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
