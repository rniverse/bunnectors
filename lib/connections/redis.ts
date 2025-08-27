import { createClient, type RedisClientType } from 'redis';

import type { IDatabase } from './db';


export const getClient = (params: any) => {
  const { url, ...opts } = params;
  const uri = url || process.env.REDIS_URL || 'redis://localhost:6379';
  return createClient({
    url: uri,
    ...opts,
  });
};

export class RedisDB implements IDatabase {
  private client: RedisClientType | undefined;

  async connect(params: any) {
    const { url, ...opts } = params;
    const uri = url || process.env.REDIS_URL || 'redis://localhost:6379';
    console.log(`Connecting to Redis at ${uri}`);
    this.client = createClient({
      url: uri,
      ...opts,
    });
    return this.client.connect();
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
