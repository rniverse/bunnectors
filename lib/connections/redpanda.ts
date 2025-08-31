import {
  Kafka, type Producer, type Consumer, type EachMessagePayload
} from 'kafkajs';

export class RedpandaClient {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Map<string, Consumer> = new Map();

  constructor(
    brokers: string[],
    private clientId = 'bun-connectors'
  ) {
    this.kafka = new Kafka({
      brokers,
      clientId: this.clientId,
      enforceRequestTimeout: true,
      requestTimeout: 30000, // default
      connectionTimeout: 10000, // default
    });
    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    for (const consumer of this.consumers.values()) {
      await consumer.disconnect();
    }
    this.consumers.clear();
  }

  async send(
    topic: string,
    messages: { key?: string; value: string; headers?: Record<string, string> }[]
  ): Promise<void> {
    await this.producer.send({
      topic,
      messages,
    });
  }

  async consume(
    topic: string,
    groupId: string,
    handler: (payload: EachMessagePayload) => Promise<void>
  ): Promise<void> {
    let consumer = this.consumers.get(groupId);
    if (!consumer) {
      consumer = this.kafka.consumer({ groupId });
      this.consumers.set(groupId, consumer);
      await consumer.connect();
    }

    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (payload) => {
        await handler(payload);
      },
    });
  }
}
