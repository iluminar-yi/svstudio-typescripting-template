import { Note, NoteGroup, NoteGroupReference, Track } from 'svstudio-scripts-typing';

import { ManagedSynthV, second } from '../../types';

export interface SvSystem {
  QUARTER: 705600000;
  createNote(): Note;
  createNoteGroup(): NoteGroup;
  createNoteGroupReference(): NoteGroupReference;
  createTrack(): Track;
  finish(): void;
  newUndoRecord(): void;
  setTimeout(timeout: number, callback: () => void): void;
  showCustomDialog: ManagedSynthV['showCustomDialog'];
  showInputBox: ManagedSynthV['showInputBox'];
  showMessageBox: ManagedSynthV['showMessageBox'];
  showOkCancelBox: ManagedSynthV['showOkCancelBox'];
  showYesNoCancelBox: ManagedSynthV['showYesNoCancelBox'];
  convertTextToPhonemesForNoteGroup(group: NoteGroupReference): string[];
  T(text: string): string;
  loop(tBegin: second, tEnd: second): void;
  play(): void;
  pause(): void;
  stop(): void;
}
