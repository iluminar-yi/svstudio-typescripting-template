import { ManagedSynthV, second } from '../types';

import { NoteGroupReferenceProxy, SvSystem } from './types';

export const svSystemFactory = (SV: ManagedSynthV): SvSystem => {
  const setTimeout = (handler: Function, timeout?: number, ...args: unknown[]): void => {
    SV.setTimeout(timeout || 0, (): void => {
      handler(...args);
    });
  };

  const setImmediate = (handler: Function, ...args: unknown[]): void => {
    setTimeout(handler, 0, ...args);
  };

  const setInterval = (handler: Function, timeout?: number, ...args: unknown[]): void => {
    const repeatedHandler = (): void => {
      handler(...args);
      setTimeout(repeatedHandler, timeout);
    };

    setTimeout(repeatedHandler, timeout);
  };

  return {
    QUARTER: SV.QUARTER,
    finish: SV.finish.bind(SV),
    newUndoRecord: (): void => SV.getProject().newUndoRecord(),
    setTimeout,
    setImmediate,
    setInterval,
    showCustomDialog: SV.showCustomDialog.bind(SV),
    showInputBox: SV.showInputBox.bind(SV),
    showMessageBox: SV.showMessageBox.bind(SV),
    showOkCancelBox: SV.showOkCancelBox.bind(SV),
    showYesNoCancelBox: SV.showYesNoCancelBox.bind(SV),
    convertTextToPhonemesForNoteGroup: (group: NoteGroupReferenceProxy): string[] => {
      return SV.getPhonemesForGroup(group._rawNoteGroupReference());
    },
    T: SV.T.bind(SV),
    loop: (tBegin: second, tEnd: second): void => SV.getPlayback().loop(tBegin, tEnd),
    pause: (): void => SV.getPlayback().pause(),
    play: (): void => SV.getPlayback().play(),
    stop: (): void => SV.getPlayback().stop(),
  };
};
