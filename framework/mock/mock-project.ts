import { NestedObject, NoteGroup, Project, TimeAxis, Track } from 'svstudio-scripts-typing';

import MockTimeAxis from './mock-time-axis';
import MockTrack from './mock-track';

const MockProject: Project = {
  addNoteGroup(): number {
    return 0;
  },

  addTrack(): number {
    return 0;
  },

  getDuration(): number {
    return 0;
  },

  getFileName(): string {
    return '';
  },

  getIndexInParent(): number {
    return 0;
  },

  getNoteGroup(): NoteGroup | undefined {
    return undefined;
  },

  getNumNoteGroupsInLibrary(): number {
    return 0;
  },

  getNumTracks(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getTimeAxis(): TimeAxis {
    return MockTimeAxis;
  },

  getTrack(): Track {
    return MockTrack;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  newUndoRecord(): void {},

  removeNoteGroup(): void {},

  removeTrack(): void {},
};

export default MockProject;
