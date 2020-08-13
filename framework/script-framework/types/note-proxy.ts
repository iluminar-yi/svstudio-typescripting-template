import { Note } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../../types';

/**
 * Serializable information from {@link Note}.
 */
export interface NoteMeta {
  duration: blick;
  lyrics: string;
  onset: blick;
  phonemes: string;
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
  dur?: number[];
  alt?: number[];
}

/**
 * Full functional replacement for {@link Note}.
 */
export interface NoteProxy extends NoteMeta {
  getEnd(): blick;
  setDuration(duration: blick): this;
  setLyrics(lyrics: string): this;
  setOnset(onset: blick): this;
  setPhonemes(phonemes: string): this;
  setPitch(pitch: number): this;
  setTF0Offset(tF0Offset: second | undefined): this;
  setTF0Left(tF0Left: second | undefined): this;
  setTF0Right(tF0Right: second | undefined): this;
  setDF0Left(dF0Left: semitone | undefined): this;
  setDF0Right(dF0Right: semitone | undefined): this;
  setTF0VbrStart(tF0VbrStart: second | undefined): this;
  setTF0VbrLeft(tF0VbrLeft: second | undefined): this;
  setTF0VbrRight(tF0VbrRight: second | undefined): this;
  setDF0Vbr(dF0Vbr: semitone | undefined): this;
  setPF0Vbr(pF0Vbr: number | undefined): this;
  setFF0Vbr(fF0Vbr: Hz | undefined): this;
  setTNoteOffset(tNoteOffset: second | undefined): this;
  setExprGroup(exprGroup: string | undefined): this;
  setDur(dur: number[] | undefined): this;
  setAlt(alt: number[] | undefined): this;
  _rawNote(): Note;
}

export interface NoteProxyBuilder {
  setDuration(duration: blick): this;
  setLyrics(lyrics: string): this;
  setOnset(onset: blick): this;
  setPhonemes(phonemes: string): this;
  setPitch(pitch: number): this;
  setTF0Offset(tF0Offset: second | undefined): this;
  setTF0Left(tF0Left: second | undefined): this;
  setTF0Right(tF0Right: second | undefined): this;
  setDF0Left(dF0Left: semitone | undefined): this;
  setDF0Right(dF0Right: semitone | undefined): this;
  setTF0VbrStart(tF0VbrStart: second | undefined): this;
  setTF0VbrLeft(tF0VbrLeft: second | undefined): this;
  setTF0VbrRight(tF0VbrRight: second | undefined): this;
  setDF0Vbr(dF0Vbr: semitone | undefined): this;
  setPF0Vbr(pF0Vbr: number | undefined): this;
  setFF0Vbr(fF0Vbr: Hz | undefined): this;
  setTNoteOffset(tNoteOffset: second | undefined): this;
  setExprGroup(exprGroup: string | undefined): this;
  setDur(dur: number[] | undefined): this;
  setAlt(alt: number[] | undefined): this;
  create(): NoteProxy;
}
