import { test, describe, expect } from 'bun:test';

import { PostgresDB } from '../';

describe('connector/postgres', () => {
  test('postgres health', async () => {
    const dbs = new PostgresDB();
    // console.log(`Connecting to Redis at ${process.env.REDIS_URL}`);
    try {
      await dbs.connect({});
      const health = await dbs.healthCheck();
      expect(health).toBe(true);
    } catch (error) {
      console.error('Error during postgres health check:', error);
      expect(error).toBeNull();
    }
  });
});
