import { test, describe, expect } from 'bun:test';

import { RedisDB } from '../';

describe('connector/redis', () => {
  test('redis health', async () => {
    const dbs = new RedisDB();
    // console.log(`Connecting to Redis at ${process.env.REDIS_URL}`);
    try {
      await dbs.connect({});
      const health = await dbs.healthCheck();
      expect(health).toBe(true);
    } catch (error) {
      console.error('Error during Redis health check:', error);
      expect(error).toBeNull();
    }
  });
});
