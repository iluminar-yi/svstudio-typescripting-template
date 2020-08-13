/**
 * `LifeCycleManager` is the core service that maintains the number of pending callback functions (`main()`
 * included). When that number drops to 0, it will automatically call {@link SynthV#finish} to end the
 * execution of the script. Hence the name.
 *
 * @internal
 */
export interface LifeCycleManager {
  /**
   * A debug utility function. Display the number of callbacks in a message box.
   */
  showCallbackCount(): void;

  /**
   * Start monitoring the number of callbacks. Must be called to be effective.
   */
  start(): void;

  /**
   * Generates a new callback ID.
   *
   * @returns New callback ID. Don't forget to release it if called.
   */
  reserveNewCallback(): string;

  /**
   * Check to see if a callback ID is (still) pending.
   *
   * @param callbackId - Callback ID to check
   * @returns True if still pending/reserved/registered. False otherwise.
   */
  isCallbackReserved(callbackId: string): boolean;

  /**
   * Release a callback from the pending state, after it has run.
   *
   * @param callbackId - ID of the callback that has run.
   */
  releaseCallback(callbackId: string): void;

  /**
   * A utility function to generate a composed callback that runs the specified callback
   * and then release the callback.
   *
   * @param callback - Callback function to be composed.
   * @param id - Callback ID returned by {@link LifeCycleManager#reserveNewCallback}.
   */
  getManagedCallback(callback: Function, id: string): (...args: unknown[]) => void;
}

export * from './sv-system';
export * from './context';
export * from './utils';
export * from './automation-proxy';
export * from './note-proxy';
export * from './note-group-proxy';
export * from './note-group-reference-proxy';
