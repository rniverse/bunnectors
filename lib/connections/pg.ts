import { SQL } from 'bun';

import type { IDatabase } from './db';


export class PostgresDB implements IDatabase {
  private client: SQL | undefined;

  async connect(opts: any) {
    this.client = new SQL({
      url: process.env.POSTGRES_URL || 'postgres://user:password@localhost:5432/test',
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
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
