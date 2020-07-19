import { SynthV } from 'svstudio-scripts-typing';

import { Global } from './types';

export const _global: Global = Function('return this')();

export const SV: SynthV = _global.SV;
