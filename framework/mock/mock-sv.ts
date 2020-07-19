import {
  ArrangementView,
  Automation,
  HostInfo,
  MainEditorView,
  Note,
  NoteGroup,
  NoteGroupReference,
  PlaybackControl,
  Project,
  SynthV,
  TimeAxis,
  Track,
  WidgetAnswers,
  YesNoCancelAnswer,
} from 'svstudio-scripts-typing';

import MockArrangementView from './mock-arrangement-view';
import MockAutomation from './mock-automation';
import MockHostInfo from './mock-host-info';
import MockMainEditorView from './mock-main-editor-view';
import MockNote from './mock-note';
import MockNoteGroup from './mock-note-group';
import MockNoteGroupReference from './mock-note-group-reference';
import MockPlaybackControl from './mock-playback-control';
import MockProject from './mock-project';
import MockTimeAxis from './mock-time-axis';
import MockTrack from './mock-track';
import MockWidgetAnswers from './mock-widget-answers';

const MockSv: SynthV = {
  QUARTER: 705600000,

  T(): string {
    return '';
  },

  blackKey(): boolean {
    return false;
  },

  blick2Quarter(): number {
    return 0;
  },

  blick2Seconds(): number {
    return 0;
  },

  blickRoundDiv(): number {
    return 0;
  },

  blickRoundTo(): number {
    return 0;
  },

  // Not sure how to make TypeScript happy here
  // @ts-ignore
  create(
    type: 'Note' | 'Automation' | 'NoteGroup' | 'NoteGroupReference' | 'TrackMixer' | 'Track' | 'TimeAxis' | 'Project',
  ): Note | Automation | NoteGroup | NoteGroupReference | {} | Track | TimeAxis | Project {
    switch (type) {
      case 'Automation':
        return MockAutomation;
      case 'Note':
        return MockNote;
      case 'NoteGroup':
        return MockNoteGroup;
      case 'NoteGroupReference':
        return MockNoteGroupReference;
      case 'Project':
        return MockProject;
      case 'TimeAxis':
        return MockTimeAxis;
      case 'Track':
        return MockTrack;
      case 'TrackMixer':
        return {};
    }
  },

  finish(): void {},

  freq2Pitch(): number {
    return 0;
  },

  getArrangement(): ArrangementView {
    return MockArrangementView;
  },

  getHostClipboard(): string {
    return '';
  },

  getHostInfo(): HostInfo {
    return MockHostInfo;
  },

  getMainEditor(): MainEditorView {
    return MockMainEditorView;
  },

  getPhonemesForGroup(): string[] {
    return [];
  },

  getPlayback(): PlaybackControl {
    return MockPlaybackControl;
  },

  getProject(): Project {
    return MockProject;
  },

  pitch2freq(): number {
    return 0;
  },

  quarter2Blick(): number {
    return 0;
  },

  seconds2Blick(): number {
    return 0;
  },

  setHostClipboard(): void {},

  setTimeout(): void {},

  showCustomDialog(): WidgetAnswers {
    return MockWidgetAnswers;
  },

  showCustomDialogAsync(): void {},

  showInputBox(): string {
    return '';
  },

  showInputBoxAsync(): void {},

  showMessageBox(): void {},

  showMessageBoxAsync(): void {},

  showOkCancelBox(): boolean {
    return false;
  },

  showOkCancelBoxAsync(): void {},

  showYesNoCancelBox(): YesNoCancelAnswer {
    return 'yes';
  },

  showYesNoCancelBoxAsync(): void {},
};

export default MockSv;
