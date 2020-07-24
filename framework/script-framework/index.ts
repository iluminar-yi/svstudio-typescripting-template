import { ManagedSynthV } from '../types';

import lifeCycleManagerInstance from './life-cycle-manager-impl';
import { ManagedSynthVImpl } from './managed-synthv-impl';

export const managedSynthV: ManagedSynthV = new ManagedSynthVImpl(lifeCycleManagerInstance);
export { svSystem } from './sv-system';
export { context } from './context';
export { utils } from './utils';
