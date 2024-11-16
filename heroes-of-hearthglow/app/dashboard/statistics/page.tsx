// AnalyticsPage.tsx
import { Suspense } from 'react';
import { fetchAnalyticsData } from '../../lib/data';
import AnalyticsClient from '../../ui/analyticsClient';

export default async function AnalyticsPage() {
  const dateRanges = [
    { start: '1daysAgo', end: 'today' },
    { start: '8daysAgo', end: '1daysAgo' },
    { start: '7daysAgo', end: 'today' },
    { start: '14daysAgo', end: '8daysAgo' },
    { start: '30daysAgo', end: 'today' },
    { start: '60daysAgo', end: '30daysAgo' },
    { start: '90daysAgo', end: 'today' },
    { start: '180daysAgo', end: '90daysAgo' },
    { start: '365daysAgo', end: 'today' },
    { start: '730daysAgo', end: '365daysAgo' },
  ];

  const dataPromises = dateRanges.map(range =>
      fetchAnalyticsData({ startDate: range.start, endDate: range.end, metrics: 'activeUsers' })
  );

  try {
    const [
      oneDayData, oneDayDataCompare,
      oneWeekData, oneWeekDataCompare,
      oneMonthData, oneMonthDataCompare,
      threeMonthData, threeMonthDataCompare,
      sixMonthData, sixMonthDataCompare,
      oneYearData, oneYearDataCompare
    ] = await Promise.all(dataPromises);

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
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return (
        <div className="text-trueGray-50 flex-col">
          <div className="flex absolute top-3">
            <p className=" text-zinc-500 ml-2">Statistics</p>
          </div>
          <div>Error loading analytics data</div>
        </div>
    );
  }
}