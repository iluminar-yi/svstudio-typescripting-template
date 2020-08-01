import { Note } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../types';

import { NoteProxy } from './types';

export const noteProxyOf = (note: Note): NoteProxy => {
  const noteProxy: NoteProxy = {
    get alt(): number[] {
      return note.getAttributes().alt;
    },
    set alt(alt: number[]) {
      note.setAttributes({ alt });
    },

    get dF0Left(): semitone {
      return note.getAttributes().dF0Left;
    },
    set dF0Left(dF0Left: semitone) {
      note.setAttributes({ dF0Left });
    },

    get dF0Right(): semitone {
      return note.getAttributes().dF0Right;
    },
    set dF0Right(dF0Right: semitone) {
      note.setAttributes({ dF0Right });
    },

    get dF0Vbr(): semitone {
      return note.getAttributes().dF0Vbr;
    },
    set dF0Vbr(dF0Vbr: semitone) {
      note.setAttributes({ dF0Vbr });
    },

    get dur(): number[] {
      return note.getAttributes().dur;
    },
    set dur(dur: number[]) {
      note.setAttributes({ dur });
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
      note.setAttributes({ exprGroup });
    },

    get fF0Vbr(): Hz {
      return note.getAttributes().fF0Vbr;
    },
    set fF0Vbr(fF0Vbr: Hz) {
      note.setAttributes({ fF0Vbr });
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

    get pF0Vbr(): number {
      return note.getAttributes().pF0Vbr;
    },
    set pF0Vbr(pF0Vbr: number) {
      note.setAttributes({ pF0Vbr });
    },

    get pitch(): number {
      return note.getPitch();
    },
    set pitch(pitch: number) {
      note.setPitch(pitch);
    },

    get tF0Left(): second {
      return note.getAttributes().tF0Left;
    },
    set tF0Left(tF0Left: second) {
      note.setAttributes({ tF0Left });
    },

    get tF0Offset(): second {
      return note.getAttributes().tF0Offset;
    },
    set tF0Offset(tF0Offset: second) {
      note.setAttributes({ tF0Offset });
    },

    get tF0Right(): second {
      return note.getAttributes().tF0Right;
    },
    set tF0Right(tF0Right: second) {
      note.setAttributes({ tF0Right });
    },

    get tF0VbrLeft(): second {
      return note.getAttributes().tF0VbrLeft;
    },
    set tF0VbrLeft(tF0VbrLeft: second) {
      note.setAttributes({ tF0VbrLeft });
    },

    get tF0VbrRight(): second {
      return note.getAttributes().tF0VbrRight;
    },
    set tF0VbrRight(tF0VbrRight: second) {
      note.setAttributes({ tF0VbrRight });
    },

    get tF0VbrStart(): second {
      return note.getAttributes().tF0VbrStart;
    },
    set tF0VbrStart(tF0VbrStart: second) {
      note.setAttributes({ tF0VbrStart });
    },

    get tNoteOffset(): second {
      return note.getAttributes().tNoteOffset;
    },
    set tNoteOffset(tNoteOffset: second) {
      note.setAttributes({ tNoteOffset });
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

    setDF0Left: (dF0Left: semitone): NoteProxy => {
      noteProxy.dF0Left = dF0Left;
      return noteProxy;
    },

    setDF0Right: (dF0Right: semitone): NoteProxy => {
      noteProxy.dF0Right = dF0Right;
      return noteProxy;
    },

    setDF0Vbr: (dF0Vbr: semitone): NoteProxy => {
      noteProxy.dF0Vbr = dF0Vbr;
      return noteProxy;
    },

    setDur: (dur: number[]): NoteProxy => {
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

    setFF0Vbr: (fF0Vbr: Hz): NoteProxy => {
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

    setPF0Vbr: (pF0Vbr: number): NoteProxy => {
      noteProxy.pF0Vbr = pF0Vbr;
      return noteProxy;
    },

    setPitch: (pitch: number): NoteProxy => {
      noteProxy.pitch = pitch;
      return noteProxy;
    },

    setTF0Left: (tF0Left: second): NoteProxy => {
      noteProxy.tF0Left = tF0Left;
      return noteProxy;
    },

    setTF0Offset: (tF0Offset: second): NoteProxy => {
      noteProxy.tF0Offset = tF0Offset;
      return noteProxy;
    },

    setTF0Right: (tF0Right: second): NoteProxy => {
      noteProxy.tF0Right = tF0Right;
      return noteProxy;
    },

    setTF0VbrLeft: (tF0VbrLeft: second): NoteProxy => {
      noteProxy.tF0VbrLeft = tF0VbrLeft;
      return noteProxy;
    },

    setTF0VbrRight: (tF0VbrRight: second): NoteProxy => {
      noteProxy.tF0VbrRight = tF0VbrRight;
      return noteProxy;
    },

    setTF0VbrStart: (tF0VbrStart: second): NoteProxy => {
      noteProxy.tF0VbrStart = tF0VbrStart;
      return noteProxy;
    },

    setTNoteOffset: (tNoteOffset: second): NoteProxy => {
      noteProxy.tNoteOffset = tNoteOffset;
      return noteProxy;
    },
  };
  return noteProxy;
};
