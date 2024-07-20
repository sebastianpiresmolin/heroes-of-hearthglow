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
}

export default function AnalyticsClient({
  oneDayData,
  oneDayDataCompare,
  oneWeekData,
  oneWeekDataCompare,
}: AnalyticsClientProps) {
  const [oneDayDifferencePercentage, setOneDayDifferencePercentage] = useState<
    string | null
  >(null);
  const [oneWeekDifferencePercentage, setOneWeekDifferencePercentage] =
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
  }, [oneDayData, oneDayDataCompare, oneWeekData, oneWeekDataCompare]);

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
    </div>
  );
}
