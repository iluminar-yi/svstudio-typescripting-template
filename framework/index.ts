import factory from '../src';

import { SV, _global } from './_global';
import log from './log';
import getMangedSynthV from './script-framework';

import './shim';

const managedSynthV = getMangedSynthV(SV);

const { getClientInfo, main, getTranslations } = factory({ ..._global, _SV: SV, log, SV: managedSynthV });

_global.getClientInfo = getClientInfo;
_global.main = (): void => {
  managedSynthV.setTimeout(0, main);
  managedSynthV.start();
};
_global.getTranslations = getTranslations;
