import { _global } from '../_global';

const _SV = _global.SV;

const setTimeout = (_global.setTimeout = (handler: Function, timeout?: number, ...args: unknown[]): void => {
  _SV.setTimeout(timeout || 0, (): void => {
    handler(...args);
  });
});

_global.setInterval = (handler: Function, timeout?: number, ...args: unknown[]): void => {
  const repeatedHandler = (): void => {
    handler(...args);
    setTimeout(repeatedHandler, timeout);
  };

  setTimeout(repeatedHandler, 0);
};

declare global {
  function setTimeout(handler: Function, timeout?: number, ...arguments: unknown[]): void;
  function setInterval(handler: Function, timeout?: number, ...arguments: unknown[]): void;
}
