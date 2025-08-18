import { test } from 'bun:test';
import { RedisDB } from '../';

test(`redis health`, async () => {
  const dbs = new RedisDB();
  const client = await dbs.connect({});
  const health = await dbs.healthCheck();
  console.log(health);
})