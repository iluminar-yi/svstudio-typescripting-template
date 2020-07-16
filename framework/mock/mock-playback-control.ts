import { NestedObject, PlaybackControl, PlaybackStatus } from 'svstudio-scripts-typing';

const MockPlaybackControl: PlaybackControl = {
  getIndexInParent(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getPlayhead(): number {
    return 0;
  },

  getStatus(): PlaybackStatus {
    return 'playing';
  },

  isMemoryManaged(): boolean {
    return false;
  },

  loop(): void {},

  pause(): void {},

  play(): void {},

  seek(): void {},

  stop(): void {},
};

export default MockPlaybackControl;
