import { NoteGroup } from 'svstudio-scripts-typing';

import { AutomationProxy } from './automation-proxy';
import { NoteGroupReferenceProxy } from './note-group-reference-proxy';
import { NoteProxy, NoteProxyBuilder } from './note-proxy';

export interface NoteGroupProxy {
  readonly id: string;
  addNote(note: NoteProxy): number;
  name: string;
  notes: NoteProxy[];
  removeNote(note: NoteProxy): void;
  readonly pitchDelta: AutomationProxy;
  readonly vibratoEnv: AutomationProxy;
  readonly loudness: AutomationProxy;
  readonly tension: AutomationProxy;
  readonly breathiness: AutomationProxy;
  readonly voicing: AutomationProxy;
  readonly gender: AutomationProxy;
  newNote(): NoteProxyBuilder;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  _rawNoteGroup(): NoteGroup;
}

export interface NoteGroupProxyBuilder {
  addNote(note: NoteProxy): this;
  setName(name: string): this;
  removeNote(note: NoteProxy): this;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  create(): NoteGroupProxy;
}
