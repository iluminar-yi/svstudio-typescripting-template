import { NestedObject, NoteGroupReference, Track } from 'svstudio-scripts-typing';

import MockNoteGroupReference from './mock-note-group-reference';

const MockTrack: Track = {
  addGroupReference(): number {
    return 0;
  },

  clone(): Track {
    return this;
  },

  getDisplayColor(): string {
    return '';
  },

  getDisplayOrder(): number {
    return 0;
  },

  getDuration(): number {
    return 0;
  },

  getGroupReference(): NoteGroupReference {
    return MockNoteGroupReference;
  },

  getIndexInParent(): number {
    return 0;
  },

  getName(): string {
    return '';
  },

  getNumGroups(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  isBounced(): boolean {
    return false;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  removeGroupReference(): void {},

  setBounced(): void {},

  setDisplayColor(): void {},

  setName(): void {},
};

export default MockTrack;
