import { test, describe, expect } from 'bun:test';

import { MongoDB } from '../';

describe('connector/mongo', () => {
  test('mongo health', async () => {
    const db = new MongoDB();
    try {
      await db.connect({});
      const health = await db.healthCheck();
      expect(health).toBe(true);
    } catch (error) {
      console.error('Error during mongo health check:', error);
      expect(error).toBeNull();
    }
  });
});
