import { HostInfo, PlaybackControl, PlaybackStatus, Project, SynthV } from 'svstudio-scripts-typing';

export interface LifeCycleManager {
  showCallbackCount(): void;
  start(): void;
  reserveNewCallback(): string;
  isCallbackReserved(callbackId: string): boolean;
  releaseCallback(callbackId: string): void;
  getManagedCallback(callback: Function, id: string): (...args: unknown[]) => void;
}

type getArrangement = SynthV['getArrangement'];
type getMainEditor = SynthV['getMainEditor'];

export interface Utility
  extends Readonly<
    Pick<
      SynthV,
      | 'blick2Quarter'
      | 'blick2Seconds'
      | 'blickRoundDiv'
      | 'blickRoundTo'
      | 'freq2Pitch'
      | 'getPhonemesForGroup'
      | 'pitch2Freq'
      | 'quarter2Blick'
      | 'seconds2Blick'
    >
  > {
  readonly isBlackKey: SynthV['blackKey'];
}

export interface NormalizedPlaybackControl
  extends Readonly<Pick<PlaybackControl, 'loop' | 'pause' | 'play' | 'seek' | 'stop'>> {
  readonly playheadBlicks: number;
  readonly playbackStatus: PlaybackStatus;
}

export interface Context {
  clipboard: string;
  readonly project: Project;
  readonly playback: NormalizedPlaybackControl;
  readonly hostInfo: Readonly<HostInfo>;
}
