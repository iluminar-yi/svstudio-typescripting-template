import { Automation, NestedObject, Note, NoteGroup } from 'svstudio-scripts-typing';

import MockAutomation from './mock-automation';
import MockNote from './mock-note';

const MockNoteGroup: NoteGroup = {
  addNote(): number {
    return 0;
  },

  clone(): NoteGroup {
    return this;
  },

  getIndexInParent(): number {
    return 0;
  },

  getName(): string {
    return '';
  },

  getNote(): Note {
    return MockNote;
  },

  getNumNotes(): number {
    return 0;
  },

  getParameter(): Automation {
    return MockAutomation;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getUUID(): string {
    return '';
  },

  isMemoryManaged(): boolean {
    return false;
  },

  removeNote(): void {},

  setName(): void {},
};

export default MockNoteGroup;
