import { MongoClient } from 'mongodb';

import type { IDatabase } from './db';

export class MongoDB implements IDatabase {
  private client: MongoClient | undefined;

  async connect(params: any) {
    const { url, ...opts } = params;
    const uri = url || process.env.MONGO_URL || 'mongodb://localhost:27017/test';
    this.client = new MongoClient(uri, opts);
    return this.client.connect();
  }

  async getInstance(): Promise<unknown> {
    if (!this.client) {
      return this.connect({});
    }
    return this.client;
  }

  async close() {
    await this.client?.close();
    this.client = undefined;
  }
  async healthCheck(): Promise<boolean> {
    await this.client?.db('test').collection('healthcheck').findOne({});
    return true;
  }
}
