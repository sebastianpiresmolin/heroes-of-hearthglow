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
  const [sevenDayData, setSevenDayData] = useState<GA4AnalyticsData | null>(
    null
  );

  // Fetch 7 day users data from the server
  useEffect(() => {
    fetch('/api/analytics/sevenDaysUsers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use text() to read the response as text first
      })
      .then((text) => {
        try {
          const data = JSON.parse(text); // Try to parse the text as JSON
          setSevenDayData(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Received text:', text); // Log the raw text to help with debugging
        }
      })
      .catch((error) => console.error('Error fetching analytics data:', error));
  }, []);

  if (!sevenDayData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-trueGray-50">
      {sevenDayData && sevenDayData.rows.length > 0 ? (
        <div>
          <p>7 Day Users</p>
          <p>{sevenDayData.rows[0].metricValues[0].value}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
