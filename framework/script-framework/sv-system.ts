import { Note, NoteGroup, NoteGroupReference, Track } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import { second } from '../types';

import { SvSystem } from './types/sv-system';

export const svSystem: SvSystem = {
  QUARTER: SV.QUARTER,
  createNote: (): Note => SV.create('Note'),
  createNoteGroup: (): NoteGroup => SV.create('NoteGroup'),
  createNoteGroupReference: (): NoteGroupReference => SV.create('NoteGroupReference'),
  createTrack: (): Track => SV.create('Track'),
  finish: SV.finish.bind(SV),
  newUndoRecord(): void {
    SV.getProject().newUndoRecord();
  },
  setTimeout: SV.setTimeout.bind(SV),
  showCustomDialog: SV.showCustomDialog.bind(SV),
  showInputBox: SV.showInputBox.bind(SV),
  showMessageBox: SV.showMessageBox.bind(SV),
  showOkCancelBox: SV.showOkCancelBox.bind(SV),
  showYesNoCancelBox: SV.showYesNoCancelBox.bind(SV),
  convertTextToPhonemesForNoteGroup: SV.getPhonemesForGroup.bind(SV),
  T: SV.T.bind(SV),
  loop(tBegin: second, tEnd: second): void {
    SV.getPlayback().loop(tBegin, tEnd);
  },
  pause(): void {
    SV.getPlayback().pause();
  },
  play(): void {
    SV.getPlayback().play();
  },
  stop(): void {
    SV.getPlayback().stop();
  },
};
