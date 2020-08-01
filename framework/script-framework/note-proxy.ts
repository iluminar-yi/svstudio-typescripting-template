import { Note } from 'svstudio-scripts-typing';

import { Hz, blick, second, semitone } from '../types';

import { NoteProxy } from './types';

export class NoteProxyImpl implements NoteProxy {
  private readonly rawNote: Note;
  public static of(note: Note): NoteProxyImpl {
    return new NoteProxyImpl(note);
  }
  public constructor(note: Note) {
    this.rawNote = note;
  }

  public get alt(): number[] {
    return this.rawNote.getAttributes().alt;
  }
  public set alt(alt: number[]) {
    this.rawNote.setAttributes({ alt });
  }

  public get dF0Left(): semitone {
    return this.rawNote.getAttributes().dF0Left;
  }
  public set dF0Left(dF0Left: semitone) {
    this.rawNote.setAttributes({ dF0Left });
  }

  public get dF0Right(): semitone {
    return this.rawNote.getAttributes().dF0Right;
  }
  public set dF0Right(dF0Right: semitone) {
    this.rawNote.setAttributes({ dF0Right });
  }

  public get dF0Vbr(): semitone {
    return this.rawNote.getAttributes().dF0Vbr;
  }
  public set dF0Vbr(dF0Vbr: semitone) {
    this.rawNote.setAttributes({ dF0Vbr });
  }

  public get dur(): number[] {
    return this.rawNote.getAttributes().dur;
  }
  public set dur(dur: number[]) {
    this.rawNote.setAttributes({ dur });
  }

  public get duration(): blick {
    return this.rawNote.getDuration();
  }
  public set duration(duration: blick) {
    this.rawNote.setDuration(duration);
  }

  public get exprGroup(): string | undefined {
    return this.rawNote.getAttributes().exprGroup;
  }
  public set exprGroup(exprGroup: string | undefined) {
    this.rawNote.setAttributes({ exprGroup });
  }

  public get fF0Vbr(): Hz {
    return this.rawNote.getAttributes().fF0Vbr;
  }
  public set fF0Vbr(fF0Vbr: Hz) {
    this.rawNote.setAttributes({ fF0Vbr });
  }

  public get lyrics(): string {
    return this.rawNote.getLyrics();
  }
  public set lyrics(lyrics: string) {
    this.rawNote.setLyrics(lyrics);
  }

  public get onset(): blick {
    return this.rawNote.getOnset();
  }
  public set onset(onset: blick) {
    this.rawNote.setOnset(onset);
  }

  public get pF0Vbr(): number {
    return this.rawNote.getAttributes().pF0Vbr;
  }
  public set pF0Vbr(pF0Vbr: number) {
    this.rawNote.setAttributes({ pF0Vbr });
  }

  public get pitch(): number {
    return this.rawNote.getPitch();
  }
  public set pitch(pitch: number) {
    this.rawNote.setPitch(pitch);
  }

  public get tF0Left(): second {
    return this.rawNote.getAttributes().tF0Left;
  }
  public set tF0Left(tF0Left: second) {
    this.rawNote.setAttributes({ tF0Left });
  }

  public get tF0Offset(): second {
    return this.rawNote.getAttributes().tF0Offset;
  }
  public set tF0Offset(tF0Offset: second) {
    this.rawNote.setAttributes({ tF0Offset });
  }

  public get tF0Right(): second {
    return this.rawNote.getAttributes().tF0Right;
  }
  public set tF0Right(tF0Right: second) {
    this.rawNote.setAttributes({ tF0Right });
  }

  public get tF0VbrLeft(): second {
    return this.rawNote.getAttributes().tF0VbrLeft;
  }
  public set tF0VbrLeft(tF0VbrLeft: second) {
    this.rawNote.setAttributes({ tF0VbrLeft });
  }

  public get tF0VbrRight(): second {
    return this.rawNote.getAttributes().tF0VbrRight;
  }
  public set tF0VbrRight(tF0VbrRight: second) {
    this.rawNote.setAttributes({ tF0VbrRight });
  }

  public get tF0VbrStart(): second {
    return this.rawNote.getAttributes().tF0VbrStart;
  }
  public set tF0VbrStart(tF0VbrStart: second) {
    this.rawNote.setAttributes({ tF0VbrStart });
  }

  public get tNoteOffset(): second {
    return this.rawNote.getAttributes().tNoteOffset;
  }
  public set tNoteOffset(tNoteOffset: second) {
    this.rawNote.setAttributes({ tNoteOffset });
  }

  public _rawNote = (): Note => {
    return this.rawNote;
  };

  public getEnd = (): blick => {
    return this.rawNote.getEnd();
  };

  public setAlt = (alt: number[]): this => {
    this.alt = alt;
    return this;
  };

  public setDF0Left = (dF0Left: semitone): this => {
    this.dF0Left = dF0Left;
    return this;
  };

  public setDF0Right = (dF0Right: semitone): this => {
    this.dF0Right = dF0Right;
    return this;
  };

  public setDF0Vbr = (dF0Vbr: semitone): this => {
    this.dF0Vbr = dF0Vbr;
    return this;
  };

  public setDur = (dur: number[]): this => {
    this.dur = dur;
    return this;
  };

  public setDuration = (duration: blick): this => {
    this.duration = duration;
    return this;
  };

  public setExprGroup = (exprGroup: string | undefined): this => {
    this.exprGroup = exprGroup;
    return this;
  };

  public setFF0Vbr = (fF0Vbr: Hz): this => {
    this.fF0Vbr = fF0Vbr;
    return this;
  };

  public setLyrics = (lyrics: string): this => {
    this.lyrics = lyrics;
    return this;
  };

  public setOnset = (onset: blick): this => {
    this.onset = onset;
    return this;
  };

  public setPF0Vbr = (pF0Vbr: number): this => {
    this.pF0Vbr = pF0Vbr;
    return this;
  };

  public setPitch = (pitch: number): this => {
    this.pitch = pitch;
    return this;
  };

  public setTF0Left = (tF0Left: second): this => {
    this.tF0Left = tF0Left;
    return this;
  };

  public setTF0Offset = (tF0Offset: second): this => {
    this.tF0Offset = tF0Offset;
    return this;
  };

  public setTF0Right = (tF0Right: second): this => {
    this.tF0Right = tF0Right;
    return this;
  };

  public setTF0VbrLeft = (tF0VbrLeft: second): this => {
    this.tF0VbrLeft = tF0VbrLeft;
    return this;
  };

  public setTF0VbrRight = (tF0VbrRight: second): this => {
    this.tF0VbrRight = tF0VbrRight;
    return this;
  };

  public setTF0VbrStart = (tF0VbrStart: second): this => {
    this.tF0VbrStart = tF0VbrStart;
    return this;
  };

  public setTNoteOffset = (tNoteOffset: second): this => {
    this.tNoteOffset = tNoteOffset;
    return this;
  };
}
