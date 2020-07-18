import factory from '../src';

import { _global } from './_global';
import log from './log';

import './shim';

const { getClientInfo, main, getTranslations } = factory({ ..._global, log });

_global.getClientInfo = getClientInfo;
_global.main = main;
_global.getTranslations = getTranslations;
