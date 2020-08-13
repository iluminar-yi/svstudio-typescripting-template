import { Track } from 'svstudio-scripts-typing';

import { blick } from '../../types';

import {
  InstrumentalReferenceProxy,
  NoteGroupReferenceProxy,
  NoteGroupReferenceProxyBuilder,
} from './note-group-reference-proxy';

/**
 * Serializable information from {@link Track}.
 */
export interface TrackMeta {
  displayColor: string;
  name: string;
  bounced: boolean;
}

/**
 * Full functional replacement for {@link Track}.
 */
export interface TrackProxy extends TrackMeta {
  readonly displayOrder: number;
  readonly duration: blick;
  readonly noteGroupReferences: (NoteGroupReferenceProxy | InstrumentalReferenceProxy)[];
  mainNoteGroupReference(): NoteGroupReferenceProxy | InstrumentalReferenceProxy;
  addNoteGroupReferences(...noteGroupReferences: NoteGroupReferenceProxy[]): this;
  removeNoteGroupReferences(index: number): void;
  newNoteGroupReference(): NoteGroupReferenceProxyBuilder;
  _rawTrack(): Track;
}

export interface TrackProxyBuilder {
  setDisplayColor(color: string): this;
  setName(name: string): this;
  setBounced(bounced: boolean): this;
  addNoteGroupReferences(...noteGroupReferences: NoteGroupReferenceProxy[]): this;
  create(): TrackProxy;
}
