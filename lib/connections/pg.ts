import { SQL } from 'bun';
import _ from 'lodash';

import type { IDatabase } from './db';


export class PostgresDB implements IDatabase {
  private client: SQL | undefined;

  async connect(opts: any) {
    const url = process.env.POSTGRES_URL || 'postgres://localhost:5432/test';
    console.log(`Connecting to Postgres - ${url}`);
    this.client = new SQL({
      url,
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
      const result = await this.client`SELECT 1 as result`;
      console.log('Postgres health check result:', result);
      return _.get(result, '0.result', 0) === 1;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
