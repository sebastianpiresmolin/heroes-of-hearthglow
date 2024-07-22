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
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}. Status: ${res.status}`);
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Rethrow to ensure the error is not silently caught
  }
}



export default async function AnalyticsPage() {
  // Fetch analytics data for the last 24 hours, 7 days, 30 days, 90 days, 180 days, and 365 days
  const oneDayData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneDaysUsers'
  );
  const oneDayDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneDaysUsersCompare'
  );
  const oneWeekData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneWeekUsers'
  );
  const oneWeekDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneWeekUsersCompare'
  );
  const oneMonthData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneMonthUsers'
  );
  const oneMonthDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneMonthUsersCompare'
  );
  const threeMonthData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/threeMonthUsers'
  );
  const threeMonthDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/threeMonthUsersCompare'
  );
  const sixMonthData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/sixMonthUsers'
  );
  const sixMonthDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/sixMonthUsersCompare'
  );
  const oneYearData = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneYearUsers'
  );
  const oneYearDataCompare = await fetchAnalyticsData(
    'https://heroes-of-hearthglow.vercel.app/api/analytics/oneYearUsersCompare'
  );
  /*const oneDayData = await fetchAnalyticsData(
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
  );*/

  return (
    <div className="text-trueGray-50 flex-col">
      <div className="flex absolute top-3">
        <p className=" text-zinc-500 ml-2">Statistics</p>
      </div>
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
