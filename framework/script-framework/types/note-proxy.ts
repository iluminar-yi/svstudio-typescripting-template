import { Note } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../../types';

export interface NoteProxy {
  duration: blick;
  lyrics: string;
  onset: blick;
  pitch: number;
  tF0Offset?: second;
  tF0Left?: second;
  tF0Right?: second;
  dF0Left?: semitone;
  dF0Right?: semitone;
  tF0VbrStart?: second;
  tF0VbrLeft?: second;
  tF0VbrRight?: second;
  dF0Vbr?: semitone;
  pF0Vbr?: number;
  fF0Vbr?: Hz;
  tNoteOffset?: second;
  exprGroup?: string;
  dur: number[];
  alt: number[];
  getEnd(): blick;
  setDuration(duration: blick): this;
  setLyrics(lyrics: string): this;
  setOnset(onset: blick): this;
  setPitch(pitch: number): this;
  setTF0Offset(tF0Offset: second): this;
  setTF0Left(tF0Left: second): this;
  setTF0Right(tF0Right: second): this;
  setDF0Left(dF0Left: semitone): this;
  setDF0Right(dF0Right: semitone): this;
  setTF0VbrStart(tF0VbrStart: second): this;
  setTF0VbrLeft(tF0VbrLeft: second): this;
  setTF0VbrRight(tF0VbrRight: second): this;
  setDF0Vbr(dF0Vbr: semitone): this;
  setPF0Vbr(pF0Vbr: number): this;
  setFF0Vbr(fF0Vbr: Hz): this;
  setTNoteOffset(tNoteOffset: second): this;
  setExprGroup(exprGroup: string | undefined): this;
  setDur(dur: number[]): this;
  setAlt(alt: number[]): this;
  _rawNote(): Note;
}

export interface NoteProxyBuilder {
  setDuration(duration: blick): this;
  setLyrics(lyrics: string): this;
  setOnset(onset: blick): this;
  setPitch(pitch: number): this;
  setTF0Offset(tF0Offset: second): this;
  setTF0Left(tF0Left: second): this;
  setTF0Right(tF0Right: second): this;
  setDF0Left(dF0Left: semitone): this;
  setDF0Right(dF0Right: semitone): this;
  setTF0VbrStart(tF0VbrStart: second): this;
  setTF0VbrLeft(tF0VbrLeft: second): this;
  setTF0VbrRight(tF0VbrRight: second): this;
  setDF0Vbr(dF0Vbr: semitone): this;
  setPF0Vbr(pF0Vbr: number): this;
  setFF0Vbr(fF0Vbr: Hz): this;
  setTNoteOffset(tNoteOffset: second): this;
  setExprGroup(exprGroup: string | undefined): this;
  setDur(dur: number[]): this;
  setAlt(alt: number[]): this;
  create(): NoteProxy;
}
