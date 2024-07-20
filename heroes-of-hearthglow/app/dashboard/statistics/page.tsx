import { Suspense } from 'react';
import AnalyticsClient from '../../ui/analyticsClient';

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

async function fetchAnalyticsData(url: string): Promise<GA4AnalyticsData> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function AnalyticsPage() {
  const oneDayData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneDaysUsers'
  );
  const oneDayDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneDaysUsersCompare'
  );

  return (
    <div className="text-trueGray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <AnalyticsClient
          oneDayData={oneDayData}
          oneDayDataCompare={oneDayDataCompare}
        />
      </Suspense>
    </div>
  );
}
