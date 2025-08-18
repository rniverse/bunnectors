import { Kafka, type Producer, type Consumer } from 'kafkajs';


/**
 * Represents a connection to a Kafka broker.
 */
export class KafkaConnection {
  public producer: Producer;
  public consumer: Consumer;

  constructor(public client: Kafka, producer: Producer, consumer: Consumer) {
    this.producer = producer;
    this.consumer = consumer;
  }

  public async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}

/**
 * Implements the IConnector interface for Kafka.
 */
export class KafkaConnector {
  public async connect(connectionString: string): Promise<KafkaConnection> {
    try {
      // kafkajs expects a list of brokers, not a single string
      const brokers = connectionString.split(',');
      const kafka = new Kafka({
        brokers: brokers,
        clientId: 'bun-connectors',
      });
      const producer = kafka.producer();
      const consumer = kafka.consumer({ groupId: 'bun-connectors-group' });

      await producer.connect();
      await consumer.connect();

      return new KafkaConnection(kafka, producer, consumer);
    } catch (error) {
      console.error('Failed to connect to Kafka:', error);
      throw error;
    }
  }
}
