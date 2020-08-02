import { NoteGroupReference } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../types';

import { noteGroupProxyOf } from './note-group-proxy';
import {
  InstrumentalReferenceProxy,
  NoteGroupProxy,
  NoteGroupReferenceProxy,
  NoteGroupReferenceProxyBase,
} from './types';

const noteGroupReferenceProxyBaseOf = (noteGroupReference: NoteGroupReference): NoteGroupReferenceProxyBase => {
  return {
    get timeOffset(): blick {
      return noteGroupReference.getTimeOffset();
    },

    set timeOffset(timeOffset: blick) {
      noteGroupReference.setTimeOffset(timeOffset);
    },

    getDuration(): blick {
      return noteGroupReference.getDuration();
    },

    getEnd(): blick {
      return noteGroupReference.getEnd();
    },

    getOnset(): blick {
      return noteGroupReference.getOnset();
    },
  };
};

export const instrumentalReferenceProxyOf = (noteGroupReference: NoteGroupReference): InstrumentalReferenceProxy => {
  if (!noteGroupReference.isInstrumental()) {
    throw new Error('This is not an instrumental note group reference');
  }
  return {
    ...noteGroupReferenceProxyBaseOf(noteGroupReference),
    instrumental: true,
    main: true,
  };
};

export const noteGroupReferenceProxyOf = (noteGroupReference: NoteGroupReference): NoteGroupReferenceProxy => {
  if (noteGroupReference.isInstrumental()) {
    throw new Error('This is an instrumental note group reference');
  }
  const noteGroupReferenceProxy: NoteGroupReferenceProxy = {
    ...noteGroupReferenceProxyBaseOf(noteGroupReference),

    instrumental: false,

    get baseBreathiness(): number {
      return noteGroupReference.getVoice().paramBreathiness;
    },
    set baseBreathiness(baseBreathiness: number) {
      noteGroupReference.setVoice({ paramBreathiness: baseBreathiness });
    },

    get baseGender(): number {
      return noteGroupReference.getVoice().paramGender;
    },
    set baseGender(baseGender: number) {
      noteGroupReference.setVoice({ paramGender: baseGender });
    },

    get baseLoudness(): number {
      return noteGroupReference.getVoice().paramLoudness;
    },
    set baseLoudness(baseLoudness: number) {
      noteGroupReference.setVoice({ paramLoudness: baseLoudness });
    },

    get baseTension(): number {
      return noteGroupReference.getVoice().paramTension;
    },
    set baseTension(baseTension: number) {
      noteGroupReference.setVoice({ paramTension: baseTension });
    },

    get dF0Left(): semitone {
      return noteGroupReference.getVoice().dF0Left;
    },
    set dF0Left(dF0Left: semitone) {
      noteGroupReference.setVoice({ dF0Left });
    },

    get dF0Right(): semitone {
      return noteGroupReference.getVoice().dF0Right;
    },
    set dF0Right(dF0Right: semitone) {
      noteGroupReference.setVoice({ dF0Right });
    },

    get dF0Vbr(): semitone {
      return noteGroupReference.getVoice().dF0Vbr;
    },
    set dF0Vbr(dF0Vbr: semitone) {
      noteGroupReference.setVoice({ dF0Vbr });
    },

    get fF0Vbr(): Hz {
      return noteGroupReference.getVoice().fF0Vbr;
    },
    set fF0Vbr(fF0Vbr: Hz) {
      noteGroupReference.setVoice({ fF0Vbr });
    },

    get main(): boolean {
      return noteGroupReference.isMain();
    },

    get pitchOffset(): semitone {
      return noteGroupReference.getPitchOffset();
    },
    set pitchOffset(pitchOffset: semitone) {
      noteGroupReference.setPitchOffset(pitchOffset);
    },

    get tF0Left(): second {
      return noteGroupReference.getVoice().tF0Left;
    },
    set tF0Left(tF0Left: second) {
      noteGroupReference.setVoice({ tF0Left });
    },

    get tF0Right(): second {
      return noteGroupReference.getVoice().tF0Right;
    },
    set tF0Right(tF0Right: second) {
      noteGroupReference.setVoice({ tF0Right });
    },

    get tF0VbrLeft(): second {
      return noteGroupReference.getVoice().tF0VbrLeft;
    },
    set tF0VbrLeft(tF0VbrLeft: second) {
      noteGroupReference.setVoice({ tF0VbrLeft });
    },

    get tF0VbrRight(): second {
      return noteGroupReference.getVoice().tF0VbrRight;
    },
    set tF0VbrRight(tF0VbrRight: second) {
      noteGroupReference.setVoice({ tF0VbrRight });
    },

    get tF0VbrStart(): second {
      return noteGroupReference.getVoice().tF0VbrStart;
    },
    set tF0VbrStart(tF0VbrStart: second) {
      noteGroupReference.setVoice({ tF0VbrStart });
    },

    get target(): NoteGroupProxy {
      return noteGroupProxyOf(noteGroupReference.getTarget());
    },
    set target(target: NoteGroupProxy) {
      noteGroupReference.setTarget(target._rawNoteGroup());
    },

    setBaseBreathiness(baseBreathiness: number): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.baseBreathiness = baseBreathiness;
      return noteGroupReferenceProxy;
    },

    setBaseGender(baseGender: number): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.baseGender = baseGender;
      return noteGroupReferenceProxy;
    },

    setBaseLoudness(baseLoudness: number): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.baseLoudness = baseLoudness;
      return noteGroupReferenceProxy;
    },

    setBaseTension(baseTension: number): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.baseTension = baseTension;
      return noteGroupReferenceProxy;
    },

    setDF0Left(dF0Left: semitone): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.dF0Left = dF0Left;
      return noteGroupReferenceProxy;
    },

    setDF0Right(dF0Right: semitone): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.dF0Right = dF0Right;
      return noteGroupReferenceProxy;
    },

    setDF0Vbr(dF0Vbr: semitone): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.dF0Vbr = dF0Vbr;
      return noteGroupReferenceProxy;
    },

    setFF0Vbr(fF0Vbr: Hz): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.fF0Vbr = fF0Vbr;
      return noteGroupReferenceProxy;
    },

    setPitchOffset(pitchOffset: semitone): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.pitchOffset = pitchOffset;
      return noteGroupReferenceProxy;
    },

    setTF0Left(tF0Left: second): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.tF0Left = tF0Left;
      return noteGroupReferenceProxy;
    },

    setTF0Right(tF0Right: second): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.tF0Right = tF0Right;
      return noteGroupReferenceProxy;
    },

    setTF0VbrLeft(tF0VbrLeft: second): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.tF0VbrLeft = tF0VbrLeft;
      return noteGroupReferenceProxy;
    },

    setTF0VbrRight(tF0VbrRight: second): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.tF0VbrRight = tF0VbrRight;
      return noteGroupReferenceProxy;
    },

    setTF0VbrStart(tF0VbrStart: second): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.tF0VbrStart = tF0VbrStart;
      return noteGroupReferenceProxy;
    },

    setTarget(target: NoteGroupProxy): NoteGroupReferenceProxy {
      noteGroupReferenceProxy.target = target;
      return noteGroupReferenceProxy;
    },

    _rawNoteGroupReference(): NoteGroupReference {
      return noteGroupReference;
    },
  };

  return noteGroupReferenceProxy;
};

export const instrumentalOrNoteGroupReferenceProxyOf = (
  noteGroupReference: NoteGroupReference,
): InstrumentalReferenceProxy | NoteGroupReferenceProxy => {
  if (noteGroupReference.isInstrumental()) {
    return instrumentalReferenceProxyOf(noteGroupReference);
  } else {
    return noteGroupReferenceProxyOf(noteGroupReference);
  }
};
