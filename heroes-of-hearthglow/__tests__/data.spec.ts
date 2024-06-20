import { getLatestNews } from '../app/lib/data';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { News } from '../app/lib/data';

describe('getLatestNews', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`Connecting to URI: ${uri}`);
    await mongoose.connect(uri, { dbName: 'verifyMASTER' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should return the latest news', async () => {
    await News.create({
      id: 1,
      title: 'First News',
      time: new Date(),
      image: 'https://example.com/first-news.jpg',
      description: 'This is the first news item',
    });
    await News.create({
      id: 2,
      title: 'Latest News',
      time: new Date(),
      image: 'https://example.com/latest-news.jpg',
      description: 'This is the latest news item',
    });

    const latestNews = await getLatestNews();
    expect(latestNews).toHaveLength(1);
    expect(latestNews[0].title).toBe('Latest News');
  });
});
