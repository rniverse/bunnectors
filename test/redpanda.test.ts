import {
  describe,
  it,
  beforeAll,
  afterAll,
  expect
} from 'bun:test';

import { RedpandaClient } from '../';



describe('connector/redpanda', () => {
  let client: RedpandaClient;

  const brokers = process.env.REDPANDA_URL || 'localhost:19092';
  const testTopic = 'test-topic';
  let timestamp = Date.now();

  beforeAll(async () => {
    client = new RedpandaClient([ brokers ], 'test-connector-client');
    await client.connect();
    // await connection.producer.send({
    //   topic: testTopic,
    //   messages: [
    //     {
    //       key: 'init',
    //       value: `warmup-${timestamp}`,
    //     },
    //   ],
    // });
  });

  afterAll(async () => {
    await client.disconnect();
  });

  it('should send and receive messages', async () => {
    let received: string[] = [];
    client.consume(testTopic, 'test-group', async ({ message }: any) => {
      if (message.value) {
        received.push(message.value.toString());
      }
      expect(received.includes(`hello-redpanda-${timestamp}`)).toBe(true);
    });

    // await client.consumer.subscribe({
    //   topic: testTopic,
    //   fromBeginning: true,
    // });

    // const run = new Promise<void>((resolve) => {
    //   client.consumer.run({
    //     eachMessage: () => {},
    //   });
    // });

    await client.send(testTopic, [
      {
        key: 'k1',
        value: `hello-redpanda-${timestamp}`,
      },
    ]);

    // expect(received).toContain(`hello-redpanda-${timestamp}`);
  });
});
