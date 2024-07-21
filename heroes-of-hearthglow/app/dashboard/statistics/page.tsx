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
  const oneWeekData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneWeekUsers'
  );
  const oneWeekDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneWeekUsersCompare'
  );
  const oneMonthData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneMonthUsers'
  );
  const oneMonthDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneMonthUsersCompare'
  );
  const threeMonthData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/threeMonthUsers'
  );
  const threeMonthDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/threeMonthUsersCompare'
  );
  const sixMonthData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/sixMonthUsers'
  );
  const sixMonthDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/sixMonthUsersCompare'
  );
  const oneYearData = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneYearUsers'
  );
  const oneYearDataCompare = await fetchAnalyticsData(
    'http://localhost:3000/api/analytics/oneYearUsersCompare'
  );

  return (
    <div className="text-trueGray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <AnalyticsClient
          oneDayData={oneDayData}
          oneDayDataCompare={oneDayDataCompare}
          oneWeekData={oneWeekData}
          oneWeekDataCompare={oneWeekDataCompare}
          oneMonthData={oneMonthData}
          oneMonthDataCompare={oneMonthDataCompare}
          threeMonthData={threeMonthData}
          threeMonthDataCompare={threeMonthDataCompare}
          sixMonthData={sixMonthData}
          sixMonthDataCompare={sixMonthDataCompare}
          oneYearData={oneYearData}
          oneYearDataCompare={oneYearDataCompare}
        />
      </Suspense>
    </div>
  );
}
