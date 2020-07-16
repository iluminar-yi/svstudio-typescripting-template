import { FrameworkEnvironment, SVScript, SVScriptFactory } from '../framework/types';

import packageJsonClientInfo from './package-json-client-info';

const svScriptFactory: SVScriptFactory = ({ SV, log }: FrameworkEnvironment): SVScript => {
  return {
    getClientInfo: packageJsonClientInfo,
    main(): void {
      log.info('Hello world!');
      SV.finish();
    },
  };
};

export default svScriptFactory;
