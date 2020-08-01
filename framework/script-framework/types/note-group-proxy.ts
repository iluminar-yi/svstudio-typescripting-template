import { Automation, NoteGroup } from 'svstudio-scripts-typing';

import { NoteGroupReferenceProxy } from './note-group-reference-proxy';
import { NoteProxy, NoteProxyBuilder } from './note-proxy';

export interface NoteGroupProxy {
  readonly id: string;
  addNote(note: NoteProxy): number;
  name: string;
  notes: NoteProxy[];
  removeNote(note: NoteProxy): void;
  readonly pitchDelta: Automation;
  readonly vibratoEnv: Automation;
  readonly loudness: Automation;
  readonly tension: Automation;
  readonly breathiness: Automation;
  readonly voicing: Automation;
  readonly gender: Automation;
  newNote(): NoteProxyBuilder;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  _rawNoteGroup(): NoteGroup;
}

export interface NoteGroupProxyConstructor {
  new (): NoteGroupProxy;
  of(note: NoteGroup): NoteGroupProxy;
}

export interface NoteGroupProxyBuilder {
  addNote(note: NoteProxy): this;
  setName(name: string): this;
  removeNote(note: NoteProxy): this;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  create(): NoteGroupProxy;
}
