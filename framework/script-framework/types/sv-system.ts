import { Note, NoteGroup, NoteGroupReference, SynthV, Track } from 'svstudio-scripts-typing';

import { second } from '../../types';

export interface SvSystem {
  QUARTER: 705600000;
  createNote(): Note;
  createNoteGroup(): NoteGroup;
  createNoteGroupReference(): NoteGroupReference;
  createTrack(): Track;
  finish(): void;
  newUndoRecord(): void;
  setTimeout(timeout: number, callback: () => void): void;
  showCustomDialog: SynthV['showCustomDialog'];
  showInputBox: SynthV['showInputBox'];
  showMessageBox: SynthV['showMessageBox'];
  showOkCancelBox: SynthV['showOkCancelBox'];
  showYesNoCancelBox: SynthV['showYesNoCancelBox'];
  convertTextToPhonemesForNoteGroup(group: NoteGroupReference): string[];
  T(text: string): string;
  loop(tBegin: second, tEnd: second): void;
  play(): void;
  pause(): void;
  stop(): void;
}
