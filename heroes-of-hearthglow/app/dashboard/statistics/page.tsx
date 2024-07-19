'use client';

import { useEffect, useState } from 'react';

// Updated type definition to match GA4 response format
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

export default function Analytics() {
  const [oneDayData, setOneDayData] = useState<GA4AnalyticsData | null>(null);
  const [oneDayDataCompare, setOneDayDataCompare] =
    useState<GA4AnalyticsData | null>(null);
  const [differencePercentage, setDifferencePercentage] = useState<
    string | null
  >(null);

  // Fetch 1 day users data from the server
  useEffect(() => {
    fetch('/api/analytics/oneDaysUsers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setOneDayData(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Received text:', text);
        }
      })
      .catch((error) => console.error('Error fetching analytics data:', error));
  }, []);

  useEffect(() => {
    fetch('/api/analytics/oneDaysUsersCompare')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setOneDayDataCompare(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .catch((error) => console.error('Error fetching analytics data:', error));
  }, []);

  // Calculate the difference percentage between the one day data sets
  useEffect(() => {
    if (oneDayData && oneDayDataCompare) {
      const oneDayDataTotalUsers = parseInt(
        oneDayData.rows[0].metricValues[0].value,
        10
      );
      const oneDayDataCompareTotalUsers = parseInt(
        oneDayDataCompare.rows[0].metricValues[0].value,
        10
      );

      const differencePercentage =
        ((oneDayDataTotalUsers - oneDayDataCompareTotalUsers) /
          oneDayDataCompareTotalUsers) *
        100;

      setDifferencePercentage(`${differencePercentage.toFixed(2)}%`);
    }
  }, [oneDayData, oneDayDataCompare]);

  console.log(
    '7 day data:',
    oneDayData,
    'previous 7 day data:',
    oneDayDataCompare
  );

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
