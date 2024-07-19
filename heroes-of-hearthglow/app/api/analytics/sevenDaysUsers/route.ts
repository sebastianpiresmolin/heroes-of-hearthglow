import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET(req: Request) {
  // Assuming your middleware has already authenticated the request
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
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'active7DayUsers' }],
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
