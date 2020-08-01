import { ManagedSynthV, second } from '../../types';

import { NoteGroupReferenceProxy } from './note-group-reference-proxy';

export interface SvSystem {
  QUARTER: 705600000;
  finish(): void;
  newUndoRecord(): void;
  setTimeout(timeout: number, callback: () => void): void;
  showCustomDialog: ManagedSynthV['showCustomDialog'];
  showInputBox: ManagedSynthV['showInputBox'];
  showMessageBox: ManagedSynthV['showMessageBox'];
  showOkCancelBox: ManagedSynthV['showOkCancelBox'];
  showYesNoCancelBox: ManagedSynthV['showYesNoCancelBox'];
  convertTextToPhonemesForNoteGroup(group: NoteGroupReferenceProxy): string[];
  T(text: string): string;
  loop(tBegin: second, tEnd: second): void;
  play(): void;
  pause(): void;
  stop(): void;
}
