import { Note, NoteGroup, NoteGroupReference, Track } from 'svstudio-scripts-typing';

import { ManagedSynthV } from '../types';

import { SvSystem } from './types';

export const svSystemFactory = (SV: ManagedSynthV): SvSystem => {
  const project = SV.getProject();
  const playbackControl = SV.getPlayback();

  return {
    QUARTER: SV.QUARTER,
    createNote: (): Note => SV.create('Note'),
    createNoteGroup: (): NoteGroup => SV.create('NoteGroup'),
    createNoteGroupReference: (): NoteGroupReference => SV.create('NoteGroupReference'),
    createTrack: (): Track => SV.create('Track'),
    finish: SV.finish.bind(SV),
    newUndoRecord: project.newUndoRecord.bind(project),
    setTimeout: SV.setTimeout.bind(SV),
    showCustomDialog: SV.showCustomDialog.bind(SV),
    showInputBox: SV.showInputBox.bind(SV),
    showMessageBox: SV.showMessageBox.bind(SV),
    showOkCancelBox: SV.showOkCancelBox.bind(SV),
    showYesNoCancelBox: SV.showYesNoCancelBox.bind(SV),
    convertTextToPhonemesForNoteGroup: SV.getPhonemesForGroup.bind(SV),
    T: SV.T.bind(SV),
    loop: playbackControl.loop.bind(playbackControl),
    pause: playbackControl.pause.bind(playbackControl),
    play: playbackControl.play.bind(playbackControl),
    stop: playbackControl.stop.bind(playbackControl),
  };
};
