import { NestedObject, NoteGroup, NoteGroupReference, VoiceParameters } from 'svstudio-scripts-typing';

import MockNoteGroup from './mock-note-group';
import MockVoiceParameters from './mock-voice-parameters';

const MockNoteGroupReference: NoteGroupReference = {
  clone(): NoteGroupReference {
    return this;
  },

  getDuration(): number {
    return 0;
  },

  getEnd(): number {
    return 0;
  },

  getIndexInParent(): number {
    return 0;
  },

  getOnset(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getPitchOffset(): number {
    return 0;
  },

  getTarget(): NoteGroup {
    return MockNoteGroup;
  },

  getTimeOffset(): number {
    return 0;
  },

  getVoice(): VoiceParameters {
    return MockVoiceParameters;
  },

  isInstrumental(): boolean {
    return false;
  },

  isMain(): boolean {
    return false;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  setPitchOffset(): void {},

  setTarget(): void {},

  setTimeOffset(): void {},

  setVoice(): void {},
};

export default MockNoteGroupReference;
