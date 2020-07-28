import { ManagedSynthV } from '../types';

import { contextFactory } from './context';
import lifeCycleManagerInstance from './life-cycle-manager-impl';
import { ManagedSynthVImpl } from './managed-synthv-impl';
import { svSystemFactory } from './sv-system';
import { Context, SvSystem, Utils } from './types';
import { utilsFactory } from './utils';

export const managedSynthV: ManagedSynthV = new ManagedSynthVImpl(lifeCycleManagerInstance);
export const svSystem: SvSystem = svSystemFactory(managedSynthV);
export const context: Context = contextFactory(managedSynthV);
export const utils: Utils = utilsFactory(managedSynthV);
