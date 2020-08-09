/**
 * @internal
 */
export interface LifeCycleManager {
  showCallbackCount(): void;
  start(): void;
  reserveNewCallback(): string;
  isCallbackReserved(callbackId: string): boolean;
  releaseCallback(callbackId: string): void;
  getManagedCallback(callback: Function, id: string): (...args: unknown[]) => void;
}

export * from './sv-system';
export * from './context';
export * from './utils';
export * from './automation-proxy';
export * from './note-proxy';
export * from './note-group-proxy';
export * from './note-group-reference-proxy';
