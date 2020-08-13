import { NoteGroupReference } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../../types';

import { NoteGroupMeta, NoteGroupProxy } from './note-group-proxy';

export interface NoteGroupReferenceProxyBase {
  getDuration(): blick;
  getEnd(): blick;
  getOnset(): blick;
  timeOffset: blick;
}

/**
 * Serializable information from {@link NoteGroupReference}.
 */
export interface NoteGroupReferenceMeta {
  pitchOffset: semitone;
  target: NoteGroupMeta;
  tF0Left: second;
  tF0Right: second;
  dF0Left: semitone;
  dF0Right: semitone;
  tF0VbrStart: second;
  tF0VbrLeft: second;
  tF0VbrRight: second;
  dF0Vbr: semitone;
  fF0Vbr: Hz;
  baseLoudness: number;
  baseTension: number;
  baseBreathiness: number;
  baseGender: number;
}

/**
 * Full functional replacement for {@link NoteGroupReference} when it does not represent an instrumental `NoteGroup`.
 */
export interface NoteGroupReferenceProxy extends NoteGroupReferenceProxyBase, NoteGroupReferenceMeta {
  readonly instrumental: false;
  readonly main: boolean;
  target: NoteGroupProxy;
  setPitchOffset(pitchOffset: semitone): this;
  setTarget(target: NoteGroupProxy): this;
  setTF0Left(tF0Left: second): this;
  setTF0Right(tF0Right: second): this;
  setDF0Left(dF0Left: semitone): this;
  setDF0Right(dF0Right: semitone): this;
  setTF0VbrStart(tF0VbrStart: second): this;
  setTF0VbrLeft(tF0VbrLeft: second): this;
  setTF0VbrRight(tF0VbrRight: second): this;
  setDF0Vbr(dF0Vbr: semitone): this;
  setFF0Vbr(fF0Vbr: Hz): this;
  setBaseLoudness(baseLoudness: number): this;
  setBaseTension(baseTension: number): this;
  setBaseBreathiness(baseBreathiness: number): this;
  setBaseGender(baseGender: number): this;
  _rawNoteGroupReference(): NoteGroupReference;
}

export interface InstrumentalReferenceProxy extends NoteGroupReferenceProxyBase {
  readonly instrumental: true;
  readonly main: true;
}

export interface NoteGroupReferenceProxyBuilder {
  setPitchOffset(pitchOffset: semitone): this;
  setTarget(target: NoteGroupProxy): NoteGroupReferenceProxyBuilderWithTarget;
  setTF0Left(tF0Left: second): this;
  setTF0Right(tF0Right: second): this;
  setDF0Left(dF0Left: semitone): this;
  setDF0Right(dF0Right: semitone): this;
  setTF0VbrStart(tF0VbrStart: second): this;
  setTF0VbrLeft(tF0VbrLeft: second): this;
  setTF0VbrRight(tF0VbrRight: second): this;
  setDF0Vbr(dF0Vbr: semitone): this;
  setFF0Vbr(fF0Vbr: Hz): this;
  setBaseLoudness(baseLoudness: number): this;
  setBaseTension(baseTension: number): this;
  setBaseBreathiness(baseBreathiness: number): this;
  setBaseGender(baseGender: number): this;
}

export interface NoteGroupReferenceProxyBuilderWithTarget extends NoteGroupReferenceProxyBuilder {
  create(): NoteGroupReferenceProxy;
}
