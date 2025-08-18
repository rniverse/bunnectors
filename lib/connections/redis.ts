import { RedisClient } from 'bun';

import type { IDatabase } from './db';

export class RedisDB implements IDatabase {
  private client: RedisClient | undefined;

  async connect(opts: any) {
    const { url } = opts;
    const uri = url || process.env.REDIS_URL || 'redis://localhost:6379';
    console.log(`Connecting to Redis at ${uri}`);
    this.client = new RedisClient({
      url: uri,
      ...opts,
    });
    await this.client.connect();
  }

  async close() {
    await this.client?.close();
    this.client = undefined;
  }

  async getInstance(): Promise<unknown> {
    if (!this.client) {
      await this.connect({});
    }
    return this.client;
  }

  async healthCheck(): Promise<boolean> {
    try {
      return await this.client?.ping() === 'PONG';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}