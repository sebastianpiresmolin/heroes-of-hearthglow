import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

/**
 * @swagger
 * /api/analytics/report:
 *   get:
 *     description: Fetch analytics data from Google Analytics 4 based on the given date range and metrics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           Start date for the analytics data
 *           Default: '7daysAgo'
 *         example: '7daysAgo'
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           End date for the analytics data
 *           Default: 'today'
 *         example: 'today'
 *       - in: query
 *         name: metrics
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           Metrics to be fetched from GA4
 *           Default: 'activeUsers'
 *         example: 'activeUsers'
 *     responses:
 *       200:
 *         description: Successful response with analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                 metadata:
 *                   type: object
 *                 dimensionHeaders:
 *                   type: array
 *                   items:
 *                     type: object
 *                 metricHeaders:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 example:
 *                   error: "Internal Server Error"
 */

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate') || '7daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const metrics = searchParams.get('metrics') || 'activeUsers';

    const credentials = {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    };

    const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: credentials,
    });

    const propertyId = `properties/${process.env.GOOGLE_GA4_PROPERTY_ID}`;

    try {
        const [response] = await analyticsDataClient.runReport({
            property: propertyId,
            dateRanges: [
                {
                    startDate: startDate,
                    endDate: endDate,
                },
            ],
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: metrics }],
        });

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}