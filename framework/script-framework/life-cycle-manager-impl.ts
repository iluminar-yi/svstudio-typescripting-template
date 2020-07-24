import { v4 as uuid } from 'uuid';

import { SV, _global } from '../_global';
import { setInterval } from '../shim/shims';

import { LifeCycleManager } from './types';

export class LifeCycleManagerImpl implements LifeCycleManager {
  private readonly onFinish: () => void;
  private readonly callbackIds: Set<string> = new Set<string>();
  private finished: boolean = false;

  public constructor(onFinish: () => void) {
    this.onFinish = onFinish;
    this.registerManagedPromise();
  }

  private registerManagedPromise = (): void => {
    const { reserveNewCallback, releaseCallback } = this;
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ShimPromise = require('core-js-pure/features/promise') as PromiseConstructor;

    class ManagedPromise<T> extends ShimPromise<T> {
      private useSuperOnly?: boolean = false;

      public then = <TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => PromiseLike<TResult1> | TResult1) | undefined | null,
        onrejected?: ((reason: unknown) => PromiseLike<TResult2> | TResult2) | undefined | null,
      ): ManagedPromise<TResult1 | TResult2> => {
        const callbackId = reserveNewCallback();
        const result = super.then(onfulfilled, onrejected);
        if (this.useSuperOnly) {
          this.useSuperOnly = false;
          return result;
        } else {
          super.then.call(
            result,
            (): void => {
              releaseCallback(callbackId);
            },
            (): void => {
              releaseCallback(callbackId);
            },
          );

          return result;
        }
      };
    }

    _global.Promise = ManagedPromise;
  };

  public showCallbackCount = (): void => {
    SV.showMessageBoxAsync(`Callback Count`, String(this.callbackIds.size));
  };

  public start = (): void => {
    setInterval((): void => {
      if (!this.callbackIds.size) {
        // SV.showMessageBoxAsync('Finished', 'No more pending tasks detected. Exiting...');
        this.finishUp();
      }
    }, 20);
  };

  private finishUp = (): void => {
    this.finished = true;
    this.callbackIds.clear();
    this.onFinish();
  };

  public reserveNewCallback = (): string => {
    const callbackId = uuid();
    this.callbackIds.add(callbackId);
    return callbackId;
  };

  public isCallbackReserved = (callbackId: string): boolean => {
    return this.callbackIds.has(callbackId);
  };

  public releaseCallback = (callbackId: string): void => {
    if (!this.callbackIds.has(callbackId)) {
      throw new Error('Given callback id not found in stored callback ids: ' + callbackId);
    }
    this.callbackIds.delete(callbackId);
  };

  public getManagedCallback = (callback: Function, id: string): ((...args: unknown[]) => void) => {
    return (...args: unknown[]): void => {
      if (!this.finished && this.callbackIds.has(id)) {
        callback(...args);
        this.releaseCallback(id);
      }
    };
  };
}

const lifeCycleManagerInstance = new LifeCycleManagerImpl(SV.finish);
export default lifeCycleManagerInstance;
