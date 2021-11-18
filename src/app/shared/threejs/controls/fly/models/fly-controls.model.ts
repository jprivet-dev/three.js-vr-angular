export interface FlyControls {
  enabled: boolean;
  enable(): void;
  disable(): void;
  connect(): void;
  disconnect(): void;
  dispose(): void;
}
