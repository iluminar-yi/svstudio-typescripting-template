import { _global } from '../_global';

const _SV = _global.SV;

_global.setTimeout = (handler: Function, timeout?: number, ...args: unknown[]): void => {
  _SV.setTimeout(timeout || 0, (): void => {
    handler(...args);
  });
};

declare global {
  function setTimeout(handler: Function, timeout?: number, ...arguments: unknown[]): void;
}
