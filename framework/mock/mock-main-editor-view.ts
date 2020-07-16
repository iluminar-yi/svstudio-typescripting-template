import {
  CoordinateSystem,
  MainEditorView,
  NestedObject,
  NoteGroupReference,
  Track,
  TrackInnerSelectionState,
} from 'svstudio-scripts-typing';

import MockCoordinateSystem from './mock-coordinate-system';
import MockNoteGroupReference from './mock-note-group-reference';
import MockTrack from './mock-track';
import MockTrackInnterSelectionState from './mock-track-innter-selection-state';

const MockMainEditorView: MainEditorView = {
  getCurrentGroup(): NoteGroupReference {
    return MockNoteGroupReference;
  },

  getCurrentTrack(): Track {
    return MockTrack;
  },

  getIndexInParent(): number {
    return 0;
  },

  getNavigation(): CoordinateSystem {
    return MockCoordinateSystem;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getSelection(): TrackInnerSelectionState {
    return MockTrackInnterSelectionState;
  },

  isMemoryManaged(): boolean {
    return false;
  },
};

export default MockMainEditorView;
