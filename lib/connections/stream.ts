export interface IStream {
  start(): Promise<void>;
  stop(): Promise<void>;
  register: {
    producer: (opts: any) => Promise<void>;
    consumer: (opts: any) => Promise<void>;
  }
}
