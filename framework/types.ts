import { ClientInfo, LanguageCode, SynthV, Translation } from 'svstudio-scripts-typing';

import { Logger } from './log/types';

export interface Global {
  SV: SynthV;
  [k1: string]: unknown;
}

export interface SVScript {
  getClientInfo(): ClientInfo;
  main(): void;
  getTranslations?(langCode: LanguageCode): Translation[];
}

export interface FrameworkEnvironment {
  SV: SynthV;
  log: Logger;
}

export type SVScriptFactory = (env: FrameworkEnvironment) => SVScript;
