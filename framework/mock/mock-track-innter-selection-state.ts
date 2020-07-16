import { NestedObject, Note, NoteGroupReference, TrackInnerSelectionState } from 'svstudio-scripts-typing';

const MockTrackInnterSelectionState: TrackInnerSelectionState = {
  clearAll(): boolean {
    return false;
  },

  clearGroups(): boolean {
    return false;
  },

  clearNotes(): boolean {
    return false;
  },

  getIndexInParent(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getSelectedGroups(): NoteGroupReference[] {
    return [];
  },

  getSelectedNotes(): Note[] {
    return [];
  },

  hasSelectedContent(): boolean {
    return false;
  },

  hasSelectedGroups(): boolean {
    return false;
  },

  hasSelectedNotes(): boolean {
    return false;
  },

  hasUnfinishedEdits(): boolean {
    return false;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  selectGroup(): void {},

  selectNote(): void {},

  unselectGroup(): boolean {
    return false;
  },

  unselectNote(): boolean {
    return false;
  },
};

export default MockTrackInnterSelectionState;
