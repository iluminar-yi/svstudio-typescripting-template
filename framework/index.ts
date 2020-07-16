import factory from '../src';

import { _global } from './_global';
import log from './log';

import './shim';

const { getClientInfo, main } = factory({ ..._global, log });

_global.getClientInfo = getClientInfo;
_global.main = main;
