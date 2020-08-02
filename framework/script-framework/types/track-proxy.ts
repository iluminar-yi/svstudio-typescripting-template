import { Track } from 'svstudio-scripts-typing';

import { blick } from '../../types';

import {
  InstrumentalReferenceProxy,
  NoteGroupReferenceProxy,
  NoteGroupReferenceProxyBuilder,
} from './note-group-reference-proxy';

export interface TrackProxy {
  displayColor: string;
  readonly displayOrder: number;
  readonly duration: blick;
  readonly noteGroupReferences: (NoteGroupReferenceProxy | InstrumentalReferenceProxy)[];
  name: string;
  bounced: boolean;
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
