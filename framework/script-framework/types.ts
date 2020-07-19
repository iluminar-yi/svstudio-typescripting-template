export interface LifeCycleManager {
  showCallbackCount(): void;
  start(): void;
  reserveNewCallback(): string;
  releaseCallback(callbackId: string): void;
  getManagedCallback(callback: Function, id: string): (...args: unknown[]) => void;
}
