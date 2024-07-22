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
  
  export async function fetchAnalyticsData(url: string): Promise<GA4AnalyticsData> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch data from ${url}. Status: ${res.status}`);
        throw new Error('Failed to fetch data');
      }
      return res.json();
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  }