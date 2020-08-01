import { NoteGroupReference } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../types';

import { NoteGroupProxyImpl } from './note-group-proxy';
import {
  InstrumentalReferenceProxy,
  NoteGroupProxy,
  NoteGroupReferenceProxy,
  NoteGroupReferenceProxyBase,
} from './types';

abstract class AbstractNoteGroupReferenceProxyBase implements NoteGroupReferenceProxyBase {
  protected readonly rawNoteGroupReference: NoteGroupReference;
  public constructor(noteGroupReference: NoteGroupReference) {
    this.rawNoteGroupReference = noteGroupReference;
  }

  public get timeOffset(): blick {
    return this.rawNoteGroupReference.getTimeOffset();
  }

  public set timeOffset(timeOffset: blick) {
    this.rawNoteGroupReference.setTimeOffset(timeOffset);
  }

  public getDuration = (): blick => {
    return this.rawNoteGroupReference.getDuration();
  };

  public getEnd = (): blick => {
    return this.rawNoteGroupReference.getEnd();
  };

  public getOnset = (): blick => {
    return this.rawNoteGroupReference.getOnset();
  };
}

export class InstrumentalReferenceProxyImpl extends AbstractNoteGroupReferenceProxyBase
  implements InstrumentalReferenceProxy {
  public readonly instrumental: true = true;
  public readonly main: true = true;

  public static of(noteGroupReference: NoteGroupReference): InstrumentalReferenceProxyImpl {
    if (!noteGroupReference.isInstrumental()) {
      throw new Error('Not an instrumental note group reference');
    }
    return new InstrumentalReferenceProxyImpl(noteGroupReference);
  }
}

export class NoteGroupReferenceProxyImpl extends AbstractNoteGroupReferenceProxyBase
  implements NoteGroupReferenceProxy {
  public readonly instrumental: false = false;

  public static of(noteGroupReference: NoteGroupReference): NoteGroupReferenceProxyImpl {
    if (noteGroupReference.isInstrumental()) {
      throw new Error('Is an instrumental note group reference');
    }
    return new NoteGroupReferenceProxyImpl(noteGroupReference);
  }

  public get baseBreathiness(): number {
    return this.rawNoteGroupReference.getVoice().paramBreathiness;
  }
  public set baseBreathiness(baseBreathiness: number) {
    this.rawNoteGroupReference.setVoice({ paramBreathiness: baseBreathiness });
  }

  public get baseGender(): number {
    return this.rawNoteGroupReference.getVoice().paramGender;
  }
  public set baseGender(baseGender: number) {
    this.rawNoteGroupReference.setVoice({ paramGender: baseGender });
  }

  public get baseLoudness(): number {
    return this.rawNoteGroupReference.getVoice().paramLoudness;
  }
  public set baseLoudness(baseLoudness: number) {
    this.rawNoteGroupReference.setVoice({ paramLoudness: baseLoudness });
  }

  public get baseTension(): number {
    return this.rawNoteGroupReference.getVoice().paramTension;
  }
  public set baseTension(baseTension: number) {
    this.rawNoteGroupReference.setVoice({ paramTension: baseTension });
  }

  public get dF0Left(): semitone {
    return this.rawNoteGroupReference.getVoice().dF0Left;
  }
  public set dF0Left(dF0Left: semitone) {
    this.rawNoteGroupReference.setVoice({ dF0Left });
  }

  public get dF0Right(): semitone {
    return this.rawNoteGroupReference.getVoice().dF0Right;
  }
  public set dF0Right(dF0Right: semitone) {
    this.rawNoteGroupReference.setVoice({ dF0Right });
  }

  public get dF0Vbr(): semitone {
    return this.rawNoteGroupReference.getVoice().dF0Vbr;
  }
  public set dF0Vbr(dF0Vbr: semitone) {
    this.rawNoteGroupReference.setVoice({ dF0Vbr });
  }

  public get fF0Vbr(): Hz {
    return this.rawNoteGroupReference.getVoice().fF0Vbr;
  }
  public set fF0Vbr(fF0Vbr: Hz) {
    this.rawNoteGroupReference.setVoice({ fF0Vbr });
  }

  public get main(): boolean {
    return this.rawNoteGroupReference.isMain();
  }

  public get pitchOffset(): semitone {
    return this.rawNoteGroupReference.getPitchOffset();
  }
  public set pitchOffset(pitchOffset: semitone) {
    this.rawNoteGroupReference.setPitchOffset(pitchOffset);
  }

  public get tF0Left(): second {
    return this.rawNoteGroupReference.getVoice().tF0Left;
  }
  public set tF0Left(tF0Left: second) {
    this.rawNoteGroupReference.setVoice({ tF0Left });
  }

  public get tF0Right(): second {
    return this.rawNoteGroupReference.getVoice().tF0Right;
  }
  public set tF0Right(tF0Right: second) {
    this.rawNoteGroupReference.setVoice({ tF0Right });
  }
  public get tF0VbrLeft(): second {
    return this.rawNoteGroupReference.getVoice().tF0VbrLeft;
  }
  public set tF0VbrLeft(tF0VbrLeft: second) {
    this.rawNoteGroupReference.setVoice({ tF0VbrLeft });
  }
  public get tF0VbrRight(): second {
    return this.rawNoteGroupReference.getVoice().tF0VbrRight;
  }
  public set tF0VbrRight(tF0VbrRight: second) {
    this.rawNoteGroupReference.setVoice({ tF0VbrRight });
  }
  public get tF0VbrStart(): second {
    return this.rawNoteGroupReference.getVoice().tF0VbrStart;
  }
  public set tF0VbrStart(tF0VbrStart: second) {
    this.rawNoteGroupReference.setVoice({ tF0VbrStart });
  }

  public get target(): NoteGroupProxy {
    return NoteGroupProxyImpl.of(this.rawNoteGroupReference.getTarget());
  }
  public set target(target: NoteGroupProxy) {
    this.rawNoteGroupReference.setTarget(target._rawNoteGroup());
  }

  public setBaseBreathiness(baseBreathiness: number): this {
    this.baseBreathiness = baseBreathiness;
    return this;
  }

  public setBaseGender(baseGender: number): this {
    this.baseGender = baseGender;
    return this;
  }

  public setBaseLoudness(baseLoudness: number): this {
    this.baseLoudness = baseLoudness;
    return this;
  }

  public setBaseTension(baseTension: number): this {
    this.baseTension = baseTension;
    return this;
  }

  public setDF0Left(dF0Left: semitone): this {
    this.dF0Left = dF0Left;
    return this;
  }

  public setDF0Right(dF0Right: semitone): this {
    this.dF0Right = dF0Right;
    return this;
  }

  public setDF0Vbr(dF0Vbr: semitone): this {
    this.dF0Vbr = dF0Vbr;
    return this;
  }

  public setFF0Vbr(fF0Vbr: Hz): this {
    this.fF0Vbr = fF0Vbr;
    return this;
  }

  public setPitchOffset(pitchOffset: semitone): this {
    this.pitchOffset = pitchOffset;
    return this;
  }

  public setTF0Left(tF0Left: second): this {
    this.tF0Left = tF0Left;
    return this;
  }

  public setTF0Right(tF0Right: second): this {
    this.tF0Right = tF0Right;
    return this;
  }

  public setTF0VbrLeft(tF0VbrLeft: second): this {
    this.tF0VbrLeft = tF0VbrLeft;
    return this;
  }

  public setTF0VbrRight(tF0VbrRight: second): this {
    this.tF0VbrRight = tF0VbrRight;
    return this;
  }

  public setTF0VbrStart(tF0VbrStart: second): this {
    this.tF0VbrStart = tF0VbrStart;
    return this;
  }

  public setTarget(target: NoteGroupProxy): this {
    this.target = target;
    return this;
  }

  public _rawNoteGroupReference(): NoteGroupReference {
    return this.rawNoteGroupReference;
  }
}
