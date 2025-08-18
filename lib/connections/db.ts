export interface IDatabase {
  connect(opts: any): Promise<unknown>;
  close(): Promise<void>;
  healthCheck(): Promise<boolean>;
  getInstance(): Promise<unknown>;
}
