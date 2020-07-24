import factory from '../src';

import './shim';
import { SV, _global } from './_global';
import log from './log';
import { context, managedSynthV, svSystem, utils } from './script-framework';
import { setImmediate } from './shim/shims';

const { getClientInfo, main, getTranslations } = factory({
  ..._global,
  _SV: SV,
  log,
  SV: managedSynthV,
  svSystem,
  context,
  utils,
});

const onFatalError = (e: Error): void => {
  SV.showMessageBoxAsync('Fatal Error', e.stack || '');
  SV.finish();
};

_global.getClientInfo = getClientInfo;
_global.main = (): void => {
  setImmediate((): void => {
    try {
      managedSynthV.start();
    } catch (e) {
      onFatalError(e);
    }
  });

  try {
    const maybePromise = main();
    if (maybePromise) {
      maybePromise.catch(onFatalError);
    }
  } catch (e) {
    onFatalError(e);
  }
};
_global.getTranslations = getTranslations;
