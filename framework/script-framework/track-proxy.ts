import { NoteGroupReference, Track } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import { Hz, blick, second, semitone } from '../types';

import { instrumentalOrNoteGroupReferenceProxyOf, noteGroupReferenceProxyOf } from './note-group-reference-proxy';
import {
  InstrumentalReferenceProxy,
  NoteGroupProxy,
  NoteGroupReferenceProxy,
  NoteGroupReferenceProxyBuilder,
  NoteGroupReferenceProxyBuilderWithTarget,
} from './types';
import { TrackProxy } from './types/track-proxy';

export class TrackProxyImpl implements TrackProxy {
  private readonly rawTrack: Track;

  public static of(track: Track): TrackProxyImpl {
    return new TrackProxyImpl(track);
  }

  public constructor(track: Track) {
    this.rawTrack = track;
  }

  public mainNoteGroupReference(): NoteGroupReferenceProxy | InstrumentalReferenceProxy {
    return this.noteGroupReferences.filter((noteGroupReference): boolean => noteGroupReference.main)[0];
  }

  public get bounced(): boolean {
    return this.rawTrack.isBounced();
  }
  public set bounced(bounced: boolean) {
    this.rawTrack.setBounced(bounced);
  }
  public get displayColor(): string {
    return this.rawTrack.getDisplayColor();
  }
  public set displayColor(displayColor: string) {
    this.rawTrack.setDisplayColor(displayColor);
  }
  public get displayOrder(): number {
    return this.rawTrack.getDisplayOrder();
  }
  public get duration(): blick {
    return this.rawTrack.getDuration();
  }
  public get name(): string {
    return this.rawTrack.getName();
  }
  public set name(name: string) {
    this.rawTrack.setName(name);
  }
  public get noteGroupReferences(): (NoteGroupReferenceProxy | InstrumentalReferenceProxy)[] {
    const noteGroupReferences: NoteGroupReference[] = [];
    for (let i = 0; i < this.rawTrack.getNumGroups(); i++) {
      noteGroupReferences.push(this.rawTrack.getGroupReference(i));
    }
    return noteGroupReferences.map(instrumentalOrNoteGroupReferenceProxyOf);
  }

  public _rawTrack = (): Track => {
    return this.rawTrack;
  };

  public addNoteGroupReferences = (...noteGroupReferences: NoteGroupReferenceProxy[]): this => {
    noteGroupReferences.forEach((noteGroupReference): void => {
      this.rawTrack.addGroupReference(noteGroupReference._rawNoteGroupReference());
    });
    return this;
  };

  public removeNoteGroupReferences = (index: number): void => {
    this.rawTrack.removeGroupReference(index);
  };

  public newNoteGroupReference = (): NoteGroupReferenceProxyBuilder => {
    const noteGroupReference = SV.create('NoteGroupReference');
    const track = this.rawTrack;
    const builder: NoteGroupReferenceProxyBuilder = {
      setBaseBreathiness(baseBreathiness: number): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ paramBreathiness: baseBreathiness });
        return this;
      },
      setBaseGender(baseGender: number): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ paramGender: baseGender });
        return this;
      },
      setBaseLoudness(baseLoudness: number): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ paramLoudness: baseLoudness });
        return this;
      },
      setBaseTension(baseTension: number): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ paramTension: baseTension });
        return this;
      },
      setDF0Left(dF0Left: semitone): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ dF0Left });
        return this;
      },
      setDF0Right(dF0Right: semitone): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ dF0Right });
        return this;
      },
      setDF0Vbr(dF0Vbr: semitone): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ dF0Vbr });
        return this;
      },
      setFF0Vbr(fF0Vbr: Hz): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ fF0Vbr });
        return this;
      },
      setPitchOffset(pitchOffset: semitone): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setPitchOffset(pitchOffset);
        return this;
      },
      setTF0Left(tF0Left: second): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ tF0Left });
        return this;
      },
      setTF0Right(tF0Right: second): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ tF0Right });
        return this;
      },
      setTF0VbrLeft(tF0VbrLeft: second): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ tF0VbrLeft });
        return this;
      },
      setTF0VbrRight(tF0VbrRight: second): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ tF0VbrRight });
        return this;
      },
      setTF0VbrStart(tF0VbrStart: second): NoteGroupReferenceProxyBuilder {
        noteGroupReference.setVoice({ tF0VbrStart });
        return this;
      },
      setTarget(target: NoteGroupProxy): NoteGroupReferenceProxyBuilderWithTarget {
        noteGroupReference.setTarget(target._rawNoteGroup());
        // @ts-ignore
        builder.create = (): NoteGroupReferenceProxy => {
          track.addGroupReference(noteGroupReference);
          return noteGroupReferenceProxyOf(noteGroupReference);
        };
        // @ts-ignore
        return builder;
      },
    };
    return builder;
  };
}
