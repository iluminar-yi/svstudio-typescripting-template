import { ClientInfo, SVObject } from 'svstudio-scripts-typing';

import { Logger } from './log/types';

export interface SVScript {
  getClientInfo(): ClientInfo;
  main(): void;
}

export interface FrameworkEnvironment {
  SV: SVObject;
  log: Logger;
}

export type SVScriptFactory = (env: FrameworkEnvironment) => SVScript;
