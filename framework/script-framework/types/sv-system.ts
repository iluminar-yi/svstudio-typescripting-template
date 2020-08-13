import { ManagedSynthV, second } from '../../types';

import { NoteGroupReferenceProxy } from './note-group-reference-proxy';

export interface SvSystem {
  QUARTER: number;
  finish(): void;
  newUndoRecord(): void;
  setTimeout(handler: Function, timeout?: number, ...args: unknown[]): void;
  setImmediate(handler: Function, ...args: unknown[]): void;
  setInterval(handler: Function, timeout?: number, ...args: unknown[]): void;
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
