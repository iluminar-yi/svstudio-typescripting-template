import { NestedObject, Note, VoiceAttributes } from 'svstudio-scripts-typing';

import MockVoiceAttributes from './mock-voice-attributes';

const MockNote: Note = {
  clone(): Note {
    return this;
  },

  getAttributes(): VoiceAttributes {
    return MockVoiceAttributes;
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

  getLyrics(): string {
    return '';
  },

  getOnset(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getPhonemes(): string {
    return '';
  },

  getPitch(): number {
    return 0;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  setAttributes(): void {},

  setDuration(): void {},

  setLyrics(): void {},

  setOnset(): void {},

  setPhonemes(): void {},

  setPitch(): void {},

  setTimeRange(): void {},
};

export default MockNote;
