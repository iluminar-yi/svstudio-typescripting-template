import { Automation, Note, NoteGroup } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import { Hz, blick, second, semitone } from '../types';

import { NoteProxyImpl } from './note-proxy';
import { NoteGroupProxy, NoteGroupReferenceProxy, NoteProxy, NoteProxyBuilder } from './types';

export class NoteGroupProxyImpl implements NoteGroupProxy {
  private readonly rawNoteGroup: NoteGroup;
  public static of(noteGroup: NoteGroup): NoteGroupProxyImpl {
    return new NoteGroupProxyImpl(noteGroup);
  }

  public constructor(noteGroup: NoteGroup) {
    this.rawNoteGroup = noteGroup;
  }

  public get breathiness(): Automation {
    return this.rawNoteGroup.getParameter('Breathiness');
  }

  public get gender(): Automation {
    return this.rawNoteGroup.getParameter('Gender');
  }

  public get id(): string {
    return this.rawNoteGroup.getUUID();
  }

  public get loudness(): Automation {
    return this.rawNoteGroup.getParameter('Loudness');
  }

  public get name(): string {
    return this.rawNoteGroup.getName();
  }

  public set name(name: string) {
    this.rawNoteGroup.setName(name);
  }

  public get notes(): NoteProxy[] {
    const notes: Note[] = [];
    for (let i = 0; i < this.rawNoteGroup.getNumNotes(); i++) {
      notes.push(this.rawNoteGroup.getNote(i));
    }
    return notes.map(NoteProxyImpl.of);
  }

  public set notes(notes: NoteProxy[]) {
    this.clearNotes();
    notes.forEach(this.addNote);
  }

  private clearNotes = (): void => {
    while (this.rawNoteGroup.getNumNotes()) {
      this.rawNoteGroup.removeNote(0);
    }
  };

  public get pitchDelta(): Automation {
    return this.rawNoteGroup.getParameter('PitchDelta');
  }

  public get tension(): Automation {
    return this.rawNoteGroup.getParameter('Tension');
  }

  public get vibratoEnv(): Automation {
    return this.rawNoteGroup.getParameter('VibratoEnv');
  }

  public get voicing(): Automation {
    return this.rawNoteGroup.getParameter('Voicing');
  }

  public _rawNoteGroup = (): NoteGroup => {
    return this.rawNoteGroup;
  };

  public addNote(note: NoteProxy): number {
    return this.rawNoteGroup.addNote(note._rawNote());
  }

  public assignTo = (noteGroupReference: NoteGroupReferenceProxy): this => {
    noteGroupReference.setTarget(this);
    return this;
  };

  public removeNote(note: NoteProxy): void {
    const rawNotes = this.notes.map((n): Note => n._rawNote());
    if (!rawNotes.find((n): boolean => n === note._rawNote())) {
      throw new Error('Given note not found!');
    }
    this.rawNoteGroup.removeNote(rawNotes.indexOf(note._rawNote()));
  }

  public newNote = (): NoteProxyBuilder => {
    const note = SV.create('Note');
    const noteGroup = this.rawNoteGroup;
    const builder: NoteProxyBuilder = {
      create(): NoteProxy {
        noteGroup.addNote(note);
        return NoteProxyImpl.of(note);
      },
      setAlt(alt: number[]): NoteProxyBuilder {
        note.setAttributes({ alt });
        return builder;
      },
      setDF0Left(dF0Left: semitone): NoteProxyBuilder {
        note.setAttributes({ dF0Left });
        return builder;
      },
      setDF0Right(dF0Right: semitone): NoteProxyBuilder {
        note.setAttributes({ dF0Right });
        return builder;
      },
      setDF0Vbr(dF0Vbr: semitone): NoteProxyBuilder {
        note.setAttributes({ dF0Vbr });
        return builder;
      },
      setDur(dur: number[]): NoteProxyBuilder {
        note.setAttributes({ dur });
        return builder;
      },
      setDuration(duration: blick): NoteProxyBuilder {
        note.setDuration(duration);
        return builder;
      },
      setExprGroup(exprGroup: string | undefined): NoteProxyBuilder {
        note.setAttributes({ exprGroup });
        return builder;
      },
      setFF0Vbr(fF0Vbr: Hz): NoteProxyBuilder {
        note.setAttributes({ fF0Vbr });
        return builder;
      },
      setLyrics(lyrics: string): NoteProxyBuilder {
        note.setLyrics(lyrics);
        return builder;
      },
      setOnset(onset: blick): NoteProxyBuilder {
        note.setOnset(onset);
        return builder;
      },
      setPF0Vbr(pF0Vbr: number): NoteProxyBuilder {
        note.setAttributes({ pF0Vbr });
        return builder;
      },
      setPitch(pitch: number): NoteProxyBuilder {
        note.setPitch(pitch);
        return builder;
      },
      setTF0Left(tF0Left: second): NoteProxyBuilder {
        note.setAttributes({ tF0Left });
        return builder;
      },
      setTF0Offset(tF0Offset: second): NoteProxyBuilder {
        note.setAttributes({ tF0Offset });
        return builder;
      },
      setTF0Right(tF0Right: second): NoteProxyBuilder {
        note.setAttributes({ tF0Right });
        return builder;
      },
      setTF0VbrLeft(tF0VbrLeft: second): NoteProxyBuilder {
        note.setAttributes({ tF0VbrLeft });
        return builder;
      },
      setTF0VbrRight(tF0VbrRight: second): NoteProxyBuilder {
        note.setAttributes({ tF0VbrRight });
        return builder;
      },
      setTF0VbrStart(tF0VbrStart: second): NoteProxyBuilder {
        note.setAttributes({ tF0VbrStart });
        return builder;
      },
      setTNoteOffset(tNoteOffset: second): NoteProxyBuilder {
        note.setAttributes({ tNoteOffset });
        return builder;
      },
    };

    return builder;
  };
}
