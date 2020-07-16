import { ArrangementSelectionState, NestedObject, NoteGroupReference } from 'svstudio-scripts-typing';

const MockArrangementSelectionState: ArrangementSelectionState = {
  clearAll(): boolean {
    return false;
  },

  clearGroups(): boolean {
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

  hasSelectedContent(): boolean {
    return false;
  },

  hasSelectedGroups(): boolean {
    return false;
  },

  hasUnfinishedEdits(): boolean {
    return false;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  selectGroup(): void {},

  unselectGroup(): boolean {
    return false;
  },
};

export default MockArrangementSelectionState;
