import { NoteGroup } from 'svstudio-scripts-typing';

import { AutomationMeta, AutomationProxy } from './automation-proxy';
import { NoteGroupReferenceProxy } from './note-group-reference-proxy';
import { NoteMeta, NoteProxy, NoteProxyBuilder } from './note-proxy';

/**
 * A simple map to map available parameter names to their type.
 * Reason for using a map is to preserve the ability to generify `AutomationMeta`.
 */
export interface NoteGroupParameterMap {
  pitchDelta: AutomationMeta;
  vibratoEnv: AutomationMeta;
  loudness: AutomationMeta;
  tension: AutomationMeta;
  breathiness: AutomationMeta;
  voicing: AutomationMeta;
  gender: AutomationMeta;
}

/**
 * Serializable information from {@link NoteGroup}.
 */
export interface NoteGroupMeta extends NoteGroupParameterMap {
  id?: string;
  name: string;
  notes: NoteMeta[];
}

/**
 * Full functional replacement for {@link NoteGroup}.
 */
export interface NoteGroupProxy extends NoteGroupMeta {
  readonly id: string;
  notes: NoteProxy[];
  addNote(note: NoteProxy): number;
  removeNote(note: NoteProxy): void;
  pitchDelta: AutomationProxy;
  vibratoEnv: AutomationProxy;
  loudness: AutomationProxy;
  tension: AutomationProxy;
  breathiness: AutomationProxy;
  voicing: AutomationProxy;
  gender: AutomationProxy;
  setPitchDelta(pitchDelta: NoteGroupParameterMap['pitchDelta']): this;
  setVibratoEnv(vibratoEnv: NoteGroupParameterMap['vibratoEnv']): this;
  setLoudness(loudness: NoteGroupParameterMap['loudness']): this;
  setTension(tension: NoteGroupParameterMap['tension']): this;
  setBreathiness(breathiness: NoteGroupParameterMap['breathiness']): this;
  setVoicing(voicing: NoteGroupParameterMap['voicing']): this;
  setGender(gender: NoteGroupParameterMap['gender']): this;
  newNote(): NoteProxyBuilder;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  _rawNoteGroup(): NoteGroup;
}

export interface NoteGroupProxyBuilder {
  addNote(note: NoteProxy): this;
  setName(name: string): this;
  removeNote(note: NoteProxy): this;
  setPitchDelta(pitchDelta: NoteGroupParameterMap['pitchDelta']): this;
  setVibratoEnv(vibratoEnv: NoteGroupParameterMap['vibratoEnv']): this;
  setLoudness(loudness: NoteGroupParameterMap['loudness']): this;
  setTension(tension: NoteGroupParameterMap['tension']): this;
  setBreathiness(breathiness: NoteGroupParameterMap['breathiness']): this;
  setVoicing(voicing: NoteGroupParameterMap['voicing']): this;
  setGender(gender: NoteGroupParameterMap['gender']): this;
  assignTo(noteGroupReference: NoteGroupReferenceProxy): this;
  create(): NoteGroupProxy;
}
