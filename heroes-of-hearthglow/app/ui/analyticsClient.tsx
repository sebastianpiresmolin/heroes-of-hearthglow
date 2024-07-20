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
  oneDayDataCompare: GA4AnalyticsData;
}

export default function AnalyticsClient({
  oneDayData,
  oneDayDataCompare,
}: AnalyticsClientProps) {
  const [differencePercentage, setDifferencePercentage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (oneDayData && oneDayDataCompare) {
      const currentUsers = parseInt(
        oneDayData.rows[0].metricValues[0].value,
        10
      );
      const previousUsers = parseInt(
        oneDayDataCompare.rows[0].metricValues[0].value,
        10
      );
      const difference = ((currentUsers - previousUsers) / previousUsers) * 100;
      setDifferencePercentage(difference.toFixed(2));
    }
  }, [oneDayData, oneDayDataCompare]);

  return (
    <div className="text-trueGray-50">
      {!oneDayData ? (
        <div>Loading...</div>
      ) : oneDayData.rows.length > 0 ? (
        <div>
          <p>7 Day Users</p>
          <p>{oneDayData.rows[0].metricValues[0].value}</p>
          {oneDayDataCompare && oneDayDataCompare.rows.length > 0 ? (
            <p
              className={
                differencePercentage && differencePercentage.charAt(0) === '-'
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {differencePercentage || 'Calculating...'}
            </p>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
