'use client';

import { useEffect, useState } from 'react';

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

interface AnalyticsClientProps {
  oneDayData: GA4AnalyticsData;
  oneDayDataCompare: GA4AnalyticsData | null;
  oneWeekData: GA4AnalyticsData;
  oneWeekDataCompare: GA4AnalyticsData | null;
  oneMonthData: GA4AnalyticsData;
  oneMonthDataCompare: GA4AnalyticsData | null;
  threeMonthData: GA4AnalyticsData;
  threeMonthDataCompare: GA4AnalyticsData | null;
  sixMonthData: GA4AnalyticsData;
  sixMonthDataCompare: GA4AnalyticsData | null;
  oneYearData: GA4AnalyticsData;
  oneYearDataCompare: GA4AnalyticsData | null;
}

export default function AnalyticsClient({
  oneDayData,
  oneDayDataCompare,
  oneWeekData,
  oneWeekDataCompare,
  oneMonthData,
  oneMonthDataCompare,
  threeMonthData,
  threeMonthDataCompare,
  sixMonthData,
  sixMonthDataCompare,
  oneYearData,
  oneYearDataCompare,
}: AnalyticsClientProps) {
  const [oneDayDifferencePercentage, setOneDayDifferencePercentage] = useState<
    string | null
  >(null);
  const [oneWeekDifferencePercentage, setOneWeekDifferencePercentage] =
    useState<string | null>(null);
  const [oneMonthDifferencePercentage, setOneMonthDifferencePercentage] =
    useState<string | null>(null);
  const [threeMonthDifferencePercentage, setThreeMonthDifferencePercentage] =
    useState<string | null>(null);
  const [sixMonthDifferencePercentage, setSixMonthDifferencePercentage] =
    useState<string | null>(null);
  const [oneYearDifferencePercentage, setOneYearDifferencePercentage] =
    useState<string | null>(null);

  useEffect(() => {
    if (
      oneDayData &&
      oneDayDataCompare &&
      oneDayData.rows.length > 0 &&
      oneDayDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        oneDayData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        oneDayDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setOneDayDifferencePercentage(difference.toFixed(2));
    } else {
      setOneDayDifferencePercentage(null);
    }

    if (
      oneWeekData &&
      oneWeekDataCompare &&
      oneWeekData.rows.length > 0 &&
      oneWeekDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        oneWeekData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        oneWeekDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setOneWeekDifferencePercentage(difference.toFixed(2));
    } else {
      setOneWeekDifferencePercentage(null);
    }

    if (
      oneMonthData &&
      oneMonthDataCompare &&
      oneMonthData.rows.length > 0 &&
      oneMonthDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        oneMonthData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        oneMonthDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setOneMonthDifferencePercentage(difference.toFixed(2));
    } else {
      setOneMonthDifferencePercentage(null);
    }

    if (
      threeMonthData &&
      threeMonthDataCompare &&
      threeMonthData.rows.length > 0 &&
      threeMonthDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        threeMonthData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        threeMonthDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setThreeMonthDifferencePercentage(difference.toFixed(2));
    } else {
      setThreeMonthDifferencePercentage(null);
    }

    if (
      sixMonthData &&
      sixMonthDataCompare &&
      sixMonthData.rows.length > 0 &&
      sixMonthDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        sixMonthData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        sixMonthDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setSixMonthDifferencePercentage(difference.toFixed(2));
    } else {
      setSixMonthDifferencePercentage(null);
    }

    if (
      oneYearData &&
      oneYearDataCompare &&
      oneYearData.rows.length > 0 &&
      oneYearDataCompare.rows.length > 0
    ) {
      const currentUsers = parseInt(
        oneYearData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        oneYearDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setOneYearDifferencePercentage(difference.toFixed(2));
    } else {
      setOneYearDifferencePercentage(null);
    }
  }, [
    oneDayData,
    oneDayDataCompare,
    oneWeekData,
    oneWeekDataCompare,
    oneMonthData,
    oneMonthDataCompare,
    threeMonthData,
    threeMonthDataCompare,
    sixMonthData,
    sixMonthDataCompare,
    oneYearData,
    oneYearDataCompare,
  ]);

  return (
    <div className="text-trueGray-50">
      {!oneDayData ? (
        <div>Loading...</div>
      ) : oneDayData.rows.length > 0 ? (
        <div>
          <p>Daily Users</p>
          <p>{oneDayData.rows[0].metricValues[0].value}</p>
          {oneDayDataCompare && oneDayDataCompare.rows.length > 0 ? (
            <p
              className={
                oneDayDifferencePercentage &&
                oneDayDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {oneDayDifferencePercentage !== null ? (
                <>
                  {`${oneDayDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}{' '}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {!oneWeekData ? (
        <div>Loading...</div>
      ) : oneWeekData.rows.length > 0 ? (
        <div>
          <p>Weekly Users</p>
          <p>{oneWeekData.rows[0].metricValues[0].value}</p>
          {oneWeekDataCompare && oneWeekDataCompare.rows.length > 0 ? (
            <p
              className={
                oneWeekDifferencePercentage &&
                oneWeekDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {oneWeekDifferencePercentage !== null ? (
                <>
                  {`${oneWeekDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {!oneMonthData ? (
        <div>Loading...</div>
      ) : oneMonthData.rows.length > 0 ? (
        <div>
          <p>Monthly Users</p>
          <p>{oneMonthData.rows[0].metricValues[0].value}</p>
          {oneMonthDataCompare && oneMonthDataCompare.rows.length > 0 ? (
            <p
              className={
                oneMonthDifferencePercentage &&
                oneMonthDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {oneMonthDifferencePercentage !== null ? (
                <>
                  {`${oneMonthDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {!threeMonthData ? (
        <div>Loading...</div>
      ) : threeMonthData.rows.length > 0 ? (
        <div>
          <p>3 Months Users</p>
          <p>{threeMonthData.rows[0].metricValues[0].value}</p>
          {threeMonthDataCompare && threeMonthDataCompare.rows.length > 0 ? (
            <p
              className={
                threeMonthDifferencePercentage &&
                threeMonthDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {threeMonthDifferencePercentage !== null ? (
                <>
                  {`${threeMonthDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {!sixMonthData ? (
        <div>Loading...</div>
      ) : sixMonthData.rows.length > 0 ? (
        <div>
          <p>6 Months Users</p>
          <p>{sixMonthData.rows[0].metricValues[0].value}</p>
          {sixMonthDataCompare && sixMonthDataCompare.rows.length > 0 ? (
            <p
              className={
                sixMonthDifferencePercentage &&
                sixMonthDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {sixMonthDifferencePercentage !== null ? (
                <>
                  {`${sixMonthDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      {!oneYearData ? (
        <div>Loading...</div>
      ) : oneYearData.rows.length > 0 ? (
        <div>
          <p>Yearly Users</p>
          <p>{oneYearData.rows[0].metricValues[0].value}</p>
          {oneYearDataCompare && oneYearDataCompare.rows.length > 0 ? (
            <p
              className={
                oneYearDifferencePercentage &&
                oneYearDifferencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {oneYearDifferencePercentage !== null ? (
                <>
                  {`${oneYearDifferencePercentage}%`}{' '}
                  <span className="text-zinc-400">from last period</span>
                </>
              ) : (
                'Calculating...'
              )}
            </p>
          ) : (
            <p className="text-zinc-400">Comparison unavailable</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
