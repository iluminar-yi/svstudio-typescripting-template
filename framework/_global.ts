import { SVObject } from 'svstudio-scripts-typing';

export const _global: {
  SV: SVObject;
  [k1: string]: unknown;
} = Function('return this')();

export const SV: SVObject = _global.SV;
