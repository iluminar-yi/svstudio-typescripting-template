import { _global } from '../_global';

const _SV = _global.SV;

export const setTimeout = (_global.setTimeout = (handler: Function, timeout?: number, ...args: unknown[]): void => {
  _SV.setTimeout(timeout || 0, (): void => {
    handler(...args);
  });
});

export const setImmediate = (_global.setImmediate = (handler: Function, ...args: unknown[]): void => {
  setTimeout(handler, 0, ...args);
});

export const setInterval = (_global.setInterval = (handler: Function, timeout?: number, ...args: unknown[]): void => {
  const repeatedHandler = (): void => {
    handler(...args);
    setTimeout(repeatedHandler, timeout);
  };

  setTimeout(repeatedHandler, timeout);
});
