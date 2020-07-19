import { SynthV } from 'svstudio-scripts-typing';

import { ManagedSynthVImpl } from './managed-synthv-impl';

export default (SV: SynthV): ManagedSynthVImpl => new ManagedSynthVImpl(SV.finish);
