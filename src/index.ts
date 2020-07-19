import { Translation } from 'svstudio-scripts-typing';

import { FrameworkEnvironment, SVScript, SVScriptFactory } from '../framework/types';

import packageJsonClientInfo from './package-json-client-info';

const svScriptFactory: SVScriptFactory = ({
  SV: { showMessageBox, setTimeout },
  log,
}: FrameworkEnvironment): SVScript => {
  return {
    getClientInfo: packageJsonClientInfo,
    async main(): Promise<void> {
      await showMessageBox('Greetings', 'Hello world!');
      log.info('Greetings displayed');
      setTimeout(3000, (): void => {
        showMessageBox('Farewell', 'Bye world!');
      });
    },
    getTranslations(): Translation[] {
      return [];
    },
  };
};

export default svScriptFactory;
