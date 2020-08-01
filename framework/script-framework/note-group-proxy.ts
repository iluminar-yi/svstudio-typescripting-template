import { Automation, Note, NoteGroup } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import { Hz, blick, second, semitone } from '../types';

import { noteProxyOf } from './note-proxy';
import { NoteGroupProxy, NoteGroupReferenceProxy, NoteProxy, NoteProxyBuilder } from './types';

export const noteGroupProxyOf = (noteGroup: NoteGroup): NoteGroupProxy => {
  const clearNotes = (): void => {
    while (noteGroup.getNumNotes()) {
      noteGroup.removeNote(0);
    }
  };

  const noteGroupProxy: NoteGroupProxy = {
    get breathiness(): Automation {
      return noteGroup.getParameter('Breathiness');
    },

    get gender(): Automation {
      return noteGroup.getParameter('Gender');
    },

    get id(): string {
      return noteGroup.getUUID();
    },

    get loudness(): Automation {
      return noteGroup.getParameter('Loudness');
    },

    get name(): string {
      return noteGroup.getName();
    },

    set name(name: string) {
      noteGroup.setName(name);
    },

    get notes(): NoteProxy[] {
      const notes: Note[] = [];
      for (let i = 0; i < noteGroup.getNumNotes(); i++) {
        notes.push(noteGroup.getNote(i));
      }
      return notes.map(noteProxyOf);
    },

    set notes(notes: NoteProxy[]) {
      clearNotes();
      notes.forEach(noteGroupProxy.addNote);
    },

    get pitchDelta(): Automation {
      return noteGroup.getParameter('PitchDelta');
    },

    get tension(): Automation {
      return noteGroup.getParameter('Tension');
    },

    get vibratoEnv(): Automation {
      return noteGroup.getParameter('VibratoEnv');
    },

    get voicing(): Automation {
      return noteGroup.getParameter('Voicing');
    },

    _rawNoteGroup: (): NoteGroup => {
      return noteGroup;
    },

    addNote(note: NoteProxy): number {
      return noteGroup.addNote(note._rawNote());
    },

    assignTo: (noteGroupReference: NoteGroupReferenceProxy): NoteGroupProxy => {
      noteGroupReference.setTarget(noteGroupProxy);
      return noteGroupProxy;
    },

    removeNote(note: NoteProxy): void {
      const rawNotes = noteGroupProxy.notes.map((n): Note => n._rawNote());
      if (!rawNotes.find((n): boolean => n === note._rawNote())) {
        throw new Error('Given note not found!');
      }
      noteGroup.removeNote(rawNotes.indexOf(note._rawNote()));
    },

    newNote: (): NoteProxyBuilder => {
      const note = SV.create('Note');
      const noteProxy = noteProxyOf(note);
      const builder: NoteProxyBuilder = {
        create(): NoteProxy {
          noteGroup.addNote(note);
          return noteProxy;
        },
        setAlt(alt: number[]): NoteProxyBuilder {
          noteProxy.alt = alt;
          return builder;
        },
        setDF0Left(dF0Left: semitone): NoteProxyBuilder {
          noteProxy.dF0Left = dF0Left;
          return builder;
        },
        setDF0Right(dF0Right: semitone): NoteProxyBuilder {
          noteProxy.dF0Right = dF0Right;
          return builder;
        },
        setDF0Vbr(dF0Vbr: semitone): NoteProxyBuilder {
          noteProxy.dF0Vbr = dF0Vbr;
          return builder;
        },
        setDur(dur: number[]): NoteProxyBuilder {
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
        setFF0Vbr(fF0Vbr: Hz): NoteProxyBuilder {
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
        setPF0Vbr(pF0Vbr: number): NoteProxyBuilder {
          noteProxy.pF0Vbr = pF0Vbr;
          return builder;
        },
        setPitch(pitch: number): NoteProxyBuilder {
          noteProxy.pitch = pitch;
          return builder;
        },
        setTF0Left(tF0Left: second): NoteProxyBuilder {
          noteProxy.tF0Left = tF0Left;
          return builder;
        },
        setTF0Offset(tF0Offset: second): NoteProxyBuilder {
          noteProxy.tF0Offset = tF0Offset;
          return builder;
        },
        setTF0Right(tF0Right: second): NoteProxyBuilder {
          noteProxy.tF0Right = tF0Right;
          return builder;
        },
        setTF0VbrLeft(tF0VbrLeft: second): NoteProxyBuilder {
          noteProxy.tF0VbrLeft = tF0VbrLeft;
          return builder;
        },
        setTF0VbrRight(tF0VbrRight: second): NoteProxyBuilder {
          noteProxy.tF0VbrRight = tF0VbrRight;
          return builder;
        },
        setTF0VbrStart(tF0VbrStart: second): NoteProxyBuilder {
          noteProxy.tF0VbrStart = tF0VbrStart;
          return builder;
        },
        setTNoteOffset(tNoteOffset: second): NoteProxyBuilder {
          noteProxy.tNoteOffset = tNoteOffset;
          return builder;
        },
      };

      return builder;
    },
  };

  return noteGroupProxy;
};
