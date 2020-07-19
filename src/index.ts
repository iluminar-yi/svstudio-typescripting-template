import { Translation } from 'svstudio-scripts-typing';

import { FrameworkEnvironment, SVScript, SVScriptFactory } from '../framework/types';

import packageJsonClientInfo from './package-json-client-info';

const svScriptFactory: SVScriptFactory = ({ SV, log }: FrameworkEnvironment): SVScript => {
  return {
    getClientInfo: packageJsonClientInfo,
    main(): void {
      log.info('Hello world!');
      const { osType, osName, hostName, hostVersion, hostVersionNumber, languageCode } = SV.getHostInfo();
      log.info(
        `Host info: osType - ${osType}, osName - ${osName}, hostName - ${hostName}, hostVersion - ${hostVersion}, hostVersionNumber - ${hostVersionNumber}, languageCode - ${languageCode}`,
      );
      SV.setTimeout(5000, (): void => {
        SV.showMessageBoxAsync('Bye1', 'Bye world');
        SV.setTimeout(10000, (): void => {
          SV.showMessageBoxAsync('Wait', 'Bye now');
        });
      });
    },
    getTranslations(): Translation[] {
      return [];
    },
  };
};

export default svScriptFactory;
