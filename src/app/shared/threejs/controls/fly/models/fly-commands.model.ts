export interface FlyCommands {
  enabled: boolean;
  connect(): void;
  disconnect(): void;
  dispose(): void;
}
