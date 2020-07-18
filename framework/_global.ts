import { SVObject } from 'svstudio-scripts-typing';

import { Global } from './types';

export const _global: Global = Function('return this')();

export const SV: SVObject = _global.SV;
