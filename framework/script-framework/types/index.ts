export interface LifeCycleManager {
  showCallbackCount(): void;
  start(): void;
  reserveNewCallback(): string;
  isCallbackReserved(callbackId: string): boolean;
  releaseCallback(callbackId: string): void;
  getManagedCallback(callback: Function, id: string): (...args: unknown[]) => void;
}

export { SvSystem } from './sv-system';
export { Context, MainEditorContext, ArrangementViewContext, ProjectContext } from './context';
export { Utils } from './utils';
