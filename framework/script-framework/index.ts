import lifeCycleManagerInstance from './life-cycle-manager-impl';
import { ManagedSynthVImpl } from './managed-synthv-impl';

export default (): ManagedSynthVImpl => new ManagedSynthVImpl(lifeCycleManagerInstance);
