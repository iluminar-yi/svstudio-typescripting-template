import { ClientInfo, LanguageCode, SVObject, Translation } from 'svstudio-scripts-typing';

import { Logger } from './log/types';

export interface Global {
  SV: SVObject;
  [k1: string]: unknown;
}

export interface SVScript {
  getClientInfo(): ClientInfo;
  main(): void;
  getTranslations?(langCode: LanguageCode): Translation[];
}

export interface FrameworkEnvironment {
  SV: SVObject;
  log: Logger;
}

export type SVScriptFactory = (env: FrameworkEnvironment) => SVScript;
