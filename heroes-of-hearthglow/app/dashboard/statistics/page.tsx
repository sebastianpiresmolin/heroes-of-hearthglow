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
  const [data, setData] = useState<GA4AnalyticsData | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use text() to read the response as text first
      })
      .then((text) => {
        try {
          const data = JSON.parse(text); // Try to parse the text as JSON
          setData(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Received text:', text); // Log the raw text to help with debugging
        }
      })
      .catch((error) => console.error('Error fetching analytics data:', error));
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-trueGray-50">
      <h1>Google Analytics Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
