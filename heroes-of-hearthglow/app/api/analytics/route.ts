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
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        // Specify the dimensions you want to include in your report
        { name: 'city' }, // Example dimension
      ],
      metrics: [
        // Specify the metrics you want to include in your report
        { name: 'active7DayUsers' }, // Example metric
      ],
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
