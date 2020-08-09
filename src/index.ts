import { Translation } from 'svstudio-scripts-typing';

import { FrameworkEnvironment, SvScript, SvScriptFactory } from '../framework/types';

import packageJsonClientInfo from './package-json-client-info';

const svScriptFactory: SvScriptFactory = ({
  context,
  svSystem: { showMessageBox, setTimeout },
  utils: { getTimePointInSeconds },
  log,
}: FrameworkEnvironment): SvScript => {
  return {
    getClientInfo: packageJsonClientInfo,
    async main(): Promise<void> {
      await showMessageBox('Greetings', 'Hello world!');
      log.debug('Greetings displayed');
      log.info(
        `Current project duration is ${context.duration} blicks, or ${getTimePointInSeconds(context.duration)} seconds`,
      );
      setTimeout((): void => {
        showMessageBox('Farewell', 'Bye world!');
      }, 3000);
    },
    getTranslations(): Translation[] {
      return [];
    },
  };
};

export default svScriptFactory;
