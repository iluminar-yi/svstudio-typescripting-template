import { Note } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import { Hz, blick, second, semitone } from '../types';

import { NoteGroupProxy, NoteMeta, NoteProxy, NoteProxyBuilder } from './types';

export const noteProxyOf = (note: Note): NoteProxy => {
  const noteProxy: NoteProxy = {
    get alt(): number[] | undefined {
      const { alt } = note.getAttributes();
      if (!alt.length) {
        return undefined;
      } else {
        return alt;
      }
    },
    set alt(alt: number[] | undefined) {
      if (alt) {
        note.setAttributes({ alt });
      }
    },

    get dF0Left(): semitone | undefined {
      return note.getAttributes().dF0Left;
    },
    set dF0Left(dF0Left: semitone | undefined) {
      if (dF0Left !== undefined) {
        note.setAttributes({ dF0Left });
      }
    },

    get dF0Right(): semitone | undefined {
      return note.getAttributes().dF0Right;
    },
    set dF0Right(dF0Right: semitone | undefined) {
      if (dF0Right !== undefined) {
        note.setAttributes({ dF0Right });
      }
    },

    get dF0Vbr(): semitone | undefined {
      return note.getAttributes().dF0Vbr;
    },
    set dF0Vbr(dF0Vbr: semitone | undefined) {
      if (dF0Vbr !== undefined) {
        note.setAttributes({ dF0Vbr });
      }
    },

    get dur(): number[] | undefined {
      const { dur } = note.getAttributes();
      if (!dur.length) {
        return undefined;
      } else {
        return dur;
      }
    },
    set dur(dur: number[] | undefined) {
      if (dur !== undefined) {
        note.setAttributes({ dur });
      }
    },

    get duration(): blick {
      return note.getDuration();
    },
    set duration(duration: blick) {
      note.setDuration(duration);
    },

    get exprGroup(): string | undefined {
      return note.getAttributes().exprGroup;
    },
    set exprGroup(exprGroup: string | undefined) {
      if (exprGroup !== undefined) {
        note.setAttributes({ exprGroup });
      }
    },

    get fF0Vbr(): Hz | undefined {
      return note.getAttributes().fF0Vbr;
    },
    set fF0Vbr(fF0Vbr: Hz | undefined) {
      if (fF0Vbr !== undefined) {
        note.setAttributes({ fF0Vbr });
      }
    },

    get lyrics(): string {
      return note.getLyrics();
    },
    set lyrics(lyrics: string) {
      note.setLyrics(lyrics);
    },

    get onset(): blick {
      return note.getOnset();
    },
    set onset(onset: blick) {
      note.setOnset(onset);
    },

    get phonemes(): string {
      return note.getPhonemes();
    },
    set phonemes(phonemes: string) {
      note.setPhonemes(phonemes);
    },

    get pF0Vbr(): number | undefined {
      return note.getAttributes().pF0Vbr;
    },
    set pF0Vbr(pF0Vbr: number | undefined) {
      if (pF0Vbr !== undefined) {
        note.setAttributes({ pF0Vbr });
      }
    },

    get pitch(): number {
      return note.getPitch();
    },
    set pitch(pitch: number) {
      note.setPitch(pitch);
    },

    get tF0Left(): second | undefined {
      return note.getAttributes().tF0Left;
    },
    set tF0Left(tF0Left: second | undefined) {
      if (tF0Left !== undefined) {
        note.setAttributes({ tF0Left });
      }
    },

    get tF0Offset(): second | undefined {
      return note.getAttributes().tF0Offset;
    },
    set tF0Offset(tF0Offset: second | undefined) {
      if (tF0Offset !== undefined) {
        note.setAttributes({ tF0Offset });
      }
    },

    get tF0Right(): second | undefined {
      return note.getAttributes().tF0Right;
    },
    set tF0Right(tF0Right: second | undefined) {
      if (tF0Right !== undefined) {
        note.setAttributes({ tF0Right });
      }
    },

    get tF0VbrLeft(): second | undefined {
      return note.getAttributes().tF0VbrLeft;
    },
    set tF0VbrLeft(tF0VbrLeft: second | undefined) {
      if (tF0VbrLeft !== undefined) {
        note.setAttributes({ tF0VbrLeft });
      }
    },

    get tF0VbrRight(): second | undefined {
      return note.getAttributes().tF0VbrRight;
    },
    set tF0VbrRight(tF0VbrRight: second | undefined) {
      if (tF0VbrRight !== undefined) {
        note.setAttributes({ tF0VbrRight });
      }
    },

    get tF0VbrStart(): second | undefined {
      return note.getAttributes().tF0VbrStart;
    },
    set tF0VbrStart(tF0VbrStart: second | undefined) {
      if (tF0VbrStart !== undefined) {
        note.setAttributes({ tF0VbrStart });
      }
    },

    get tNoteOffset(): second | undefined {
      return note.getAttributes().tNoteOffset;
    },
    set tNoteOffset(tNoteOffset: second | undefined) {
      if (tNoteOffset !== undefined) {
        note.setAttributes({ tNoteOffset });
      }
    },

    _rawNote: (): Note => {
      return note;
    },

    getEnd: (): blick => {
      return note.getEnd();
    },

    setAlt: (alt: number[]): NoteProxy => {
      noteProxy.alt = alt;
      return noteProxy;
    },

    setDF0Left: (dF0Left: semitone | undefined): NoteProxy => {
      noteProxy.dF0Left = dF0Left;
      return noteProxy;
    },

    setDF0Right: (dF0Right: semitone | undefined): NoteProxy => {
      noteProxy.dF0Right = dF0Right;
      return noteProxy;
    },

    setDF0Vbr: (dF0Vbr: semitone | undefined): NoteProxy => {
      noteProxy.dF0Vbr = dF0Vbr;
      return noteProxy;
    },

    setDur: (dur: number[] | undefined): NoteProxy => {
      noteProxy.dur = dur;
      return noteProxy;
    },

    setDuration: (duration: blick): NoteProxy => {
      noteProxy.duration = duration;
      return noteProxy;
    },

    setExprGroup: (exprGroup: string | undefined): NoteProxy => {
      noteProxy.exprGroup = exprGroup;
      return noteProxy;
    },

    setFF0Vbr: (fF0Vbr: Hz | undefined): NoteProxy => {
      noteProxy.fF0Vbr = fF0Vbr;
      return noteProxy;
    },

    setLyrics: (lyrics: string): NoteProxy => {
      noteProxy.lyrics = lyrics;
      return noteProxy;
    },

    setOnset: (onset: blick): NoteProxy => {
      noteProxy.onset = onset;
      return noteProxy;
    },

    setPhonemes: (phonemes: string): NoteProxy => {
      noteProxy.phonemes = phonemes;
      return noteProxy;
    },

    setPF0Vbr: (pF0Vbr: number | undefined): NoteProxy => {
      noteProxy.pF0Vbr = pF0Vbr;
      return noteProxy;
    },

    setPitch: (pitch: number): NoteProxy => {
      noteProxy.pitch = pitch;
      return noteProxy;
    },

    setTF0Left: (tF0Left: second | undefined): NoteProxy => {
      noteProxy.tF0Left = tF0Left;
      return noteProxy;
    },

    setTF0Offset: (tF0Offset: second | undefined): NoteProxy => {
      noteProxy.tF0Offset = tF0Offset;
      return noteProxy;
    },

    setTF0Right: (tF0Right: second | undefined): NoteProxy => {
      noteProxy.tF0Right = tF0Right;
      return noteProxy;
    },

    setTF0VbrLeft: (tF0VbrLeft: second | undefined): NoteProxy => {
      noteProxy.tF0VbrLeft = tF0VbrLeft;
      return noteProxy;
    },

    setTF0VbrRight: (tF0VbrRight: second | undefined): NoteProxy => {
      noteProxy.tF0VbrRight = tF0VbrRight;
      return noteProxy;
    },

    setTF0VbrStart: (tF0VbrStart: second | undefined): NoteProxy => {
      noteProxy.tF0VbrStart = tF0VbrStart;
      return noteProxy;
    },

    setTNoteOffset: (tNoteOffset: second | undefined): NoteProxy => {
      noteProxy.tNoteOffset = tNoteOffset;
      return noteProxy;
    },
  };
  return noteProxy;
};

export const createNoteProxyBuilder = (noteGroup: NoteGroupProxy): NoteProxyBuilder => {
  const note = SV.create('Note');
  const noteProxy = noteProxyOf(note);
  const builder: NoteProxyBuilder = {
    create(): NoteProxy {
      noteGroup._rawNoteGroup().addNote(note);
      return noteProxy;
    },
    setAlt(alt: number[] | undefined): NoteProxyBuilder {
      noteProxy.alt = alt;
      return builder;
    },
    setDF0Left(dF0Left: semitone | undefined): NoteProxyBuilder {
      noteProxy.dF0Left = dF0Left;
      return builder;
    },
    setDF0Right(dF0Right: semitone | undefined): NoteProxyBuilder {
      noteProxy.dF0Right = dF0Right;
      return builder;
    },
    setDF0Vbr(dF0Vbr: semitone | undefined): NoteProxyBuilder {
      noteProxy.dF0Vbr = dF0Vbr;
      return builder;
    },
    setDur(dur: number[] | undefined): NoteProxyBuilder {
      noteProxy.dur = dur;
      return builder;
    },
    setDuration(duration: blick): NoteProxyBuilder {
      noteProxy.duration = duration;
      return builder;
    },
    setExprGroup(exprGroup: string | undefined): NoteProxyBuilder {
      noteProxy.exprGroup = exprGroup;
      return builder;
    },
    setFF0Vbr(fF0Vbr: Hz | undefined): NoteProxyBuilder {
      noteProxy.fF0Vbr = fF0Vbr;
      return builder;
    },
    setLyrics(lyrics: string): NoteProxyBuilder {
      noteProxy.lyrics = lyrics;
      return builder;
    },
    setOnset(onset: blick): NoteProxyBuilder {
      noteProxy.onset = onset;
      return builder;
    },
    setPhonemes(phonemes: string): NoteProxyBuilder {
      noteProxy.phonemes = phonemes;
      return builder;
    },
    setPF0Vbr(pF0Vbr: number | undefined): NoteProxyBuilder {
      noteProxy.pF0Vbr = pF0Vbr;
      return builder;
    },
    setPitch(pitch: number): NoteProxyBuilder {
      noteProxy.pitch = pitch;
      return builder;
    },
    setTF0Left(tF0Left: second | undefined): NoteProxyBuilder {
      noteProxy.tF0Left = tF0Left;
      return builder;
    },
    setTF0Offset(tF0Offset: second | undefined): NoteProxyBuilder {
      noteProxy.tF0Offset = tF0Offset;
      return builder;
    },
    setTF0Right(tF0Right: second | undefined): NoteProxyBuilder {
      noteProxy.tF0Right = tF0Right;
      return builder;
    },
    setTF0VbrLeft(tF0VbrLeft: second | undefined): NoteProxyBuilder {
      noteProxy.tF0VbrLeft = tF0VbrLeft;
      return builder;
    },
    setTF0VbrRight(tF0VbrRight: second | undefined): NoteProxyBuilder {
      noteProxy.tF0VbrRight = tF0VbrRight;
      return builder;
    },
    setTF0VbrStart(tF0VbrStart: second | undefined): NoteProxyBuilder {
      noteProxy.tF0VbrStart = tF0VbrStart;
      return builder;
    },
    setTNoteOffset(tNoteOffset: second | undefined): NoteProxyBuilder {
      noteProxy.tNoteOffset = tNoteOffset;
      return builder;
    },
  };

  return builder;
};

export const fromNoteMeta = (noteMeta: NoteMeta, noteGroup: NoteGroupProxy): NoteProxy => {
  const {
    duration,
    lyrics,
    onset,
    phonemes,
    pitch,
    tF0Offset,
    tF0Left,
    tF0Right,
    dF0Left,
    dF0Right,
    tF0VbrStart,
    tF0VbrLeft,
    tF0VbrRight,
    dF0Vbr,
    pF0Vbr,
    fF0Vbr,
    tNoteOffset,
    exprGroup,
    dur,
    alt,
  } = noteMeta;

  return createNoteProxyBuilder(noteGroup)
    .setDuration(duration)
    .setLyrics(lyrics)
    .setOnset(onset)
    .setPhonemes(phonemes)
    .setPitch(pitch)
    .setTF0Offset(tF0Offset)
    .setTF0Left(tF0Left)
    .setTF0Right(tF0Right)
    .setDF0Left(dF0Left)
    .setDF0Right(dF0Right)
    .setTF0VbrStart(tF0VbrStart)
    .setTF0VbrLeft(tF0VbrLeft)
    .setTF0VbrRight(tF0VbrRight)
    .setDF0Vbr(dF0Vbr)
    .setPF0Vbr(pF0Vbr)
    .setFF0Vbr(fF0Vbr)
    .setTNoteOffset(tNoteOffset)
    .setExprGroup(exprGroup)
    .setDur(dur)
    .setAlt(alt)
    .create();
};
