import { NoteGroupReference, Project, Track } from 'svstudio-scripts-typing';

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
import { TrackProxy, TrackProxyBuilder } from './types/track-proxy';

export const trackProxyOf = (track: Track): TrackProxy => {
  const trackProxy: TrackProxy = {
    get bounced(): boolean {
      return track.isBounced();
    },
    set bounced(bounced: boolean) {
      track.setBounced(bounced);
    },

    get displayColor(): string {
      return track.getDisplayColor();
    },
    set displayColor(displayColor: string) {
      track.setDisplayColor(displayColor);
    },

    get displayOrder(): number {
      return track.getDisplayOrder();
    },

    get duration(): blick {
      return track.getDuration();
    },

    get name(): string {
      return track.getName();
    },
    set name(name: string) {
      track.setName(name);
    },

    get noteGroupReferences(): (NoteGroupReferenceProxy | InstrumentalReferenceProxy)[] {
      const noteGroupReferences: NoteGroupReference[] = [];
      for (let i = 0; i < track.getNumGroups(); i++) {
        noteGroupReferences.push(track.getGroupReference(i));
      }
      return noteGroupReferences.map(instrumentalOrNoteGroupReferenceProxyOf);
    },

    mainNoteGroupReference(): NoteGroupReferenceProxy | InstrumentalReferenceProxy {
      return trackProxy.noteGroupReferences.filter((noteGroupReference): boolean => noteGroupReference.main)[0];
    },

    _rawTrack(): Track {
      return track;
    },

    addNoteGroupReferences(...noteGroupReferences: NoteGroupReferenceProxy[]): TrackProxy {
      noteGroupReferences.forEach((noteGroupReference): void => {
        track.addGroupReference(noteGroupReference._rawNoteGroupReference());
      });
      return trackProxy;
    },

    removeNoteGroupReferences(index: number): void {
      track.removeGroupReference(index);
    },

    newNoteGroupReference(): NoteGroupReferenceProxyBuilder {
      const noteGroupReference = SV.create('NoteGroupReference');
      const builder: NoteGroupReferenceProxyBuilder = {
        setBaseBreathiness(baseBreathiness: number): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ paramBreathiness: baseBreathiness });
          return builder;
        },
        setBaseGender(baseGender: number): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ paramGender: baseGender });
          return builder;
        },
        setBaseLoudness(baseLoudness: number): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ paramLoudness: baseLoudness });
          return builder;
        },
        setBaseTension(baseTension: number): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ paramTension: baseTension });
          return builder;
        },
        setDF0Left(dF0Left: semitone): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ dF0Left });
          return builder;
        },
        setDF0Right(dF0Right: semitone): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ dF0Right });
          return builder;
        },
        setDF0Vbr(dF0Vbr: semitone): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ dF0Vbr });
          return builder;
        },
        setFF0Vbr(fF0Vbr: Hz): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ fF0Vbr });
          return builder;
        },
        setPitchOffset(pitchOffset: semitone): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setPitchOffset(pitchOffset);
          return builder;
        },
        setTF0Left(tF0Left: second): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ tF0Left });
          return builder;
        },
        setTF0Right(tF0Right: second): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ tF0Right });
          return builder;
        },
        setTF0VbrLeft(tF0VbrLeft: second): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ tF0VbrLeft });
          return builder;
        },
        setTF0VbrRight(tF0VbrRight: second): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ tF0VbrRight });
          return builder;
        },
        setTF0VbrStart(tF0VbrStart: second): NoteGroupReferenceProxyBuilder {
          noteGroupReference.setVoice({ tF0VbrStart });
          return builder;
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
    },
  };
  return trackProxy;
};

export const createTrackProxyBuilder = (project: Project): TrackProxyBuilder => {
  const track = SV.create('Track');
  const trackProxy = trackProxyOf(track);

  const builder: TrackProxyBuilder = {
    addNoteGroupReferences(...noteGroupReferences: NoteGroupReferenceProxy[]): TrackProxyBuilder {
      trackProxy.addNoteGroupReferences(...noteGroupReferences);
      return builder;
    },
    setBounced(bounced: boolean): TrackProxyBuilder {
      track.setBounced(bounced);
      return builder;
    },
    setDisplayColor(color: string): TrackProxyBuilder {
      track.setDisplayColor(color);
      return builder;
    },
    setName(name: string): TrackProxyBuilder {
      track.setName(name);
      return builder;
    },
    create(): TrackProxy {
      project.addTrack(track);
      return trackProxy;
    },
  };

  return builder;
};
