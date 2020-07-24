import {
  LanguageCode,
  MeasureMark,
  Note,
  NoteGroup,
  NoteGroupReference,
  PlaybackStatus,
  TempoMark,
  Track,
} from 'svstudio-scripts-typing';

import { blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../../types';

export interface UserContentSelection {
  readonly hasUnfinishedEdits: boolean;
  removeAllSelected(): void;
}

export interface UserNoteGroupSelection {
  readonly noteGroupReferences?: NoteGroupReference[];
  addGroupReference(noteGroupReference: NoteGroupReference): void;
  removeGroupReference(noteGroupReference: NoteGroupReference): boolean;
  removeAllGroupReferences(): boolean;
}

export interface UserNoteSelection {
  readonly notes?: Note[];
  addNote(note: Note): void;
  removeNote(note: Note): boolean;
  removeAllNotes(): boolean;
}

export interface MainEditorUserSelection extends UserContentSelection, UserNoteGroupSelection, UserNoteSelection {}
export interface ArrangementViewUserSelection extends UserContentSelection, UserNoteGroupSelection {}

export interface HorizontalDisplay {
  timeScale: pixelPerBlick;
  timeLeft: blick;
  timeRight: blick;
  snap(timePosition: blick): blick;
  t2x(timePosition: blick): pixel;
  x2t(xPosition: pixel): blick;
}

export interface VerticalDisplay {
  readonly valueScale: pixelPerSemitone;
  readonly valueTop: semitone;
  readonly valueBottom: semitone;
  valueCenter: semitone;
  v2y(valuePoint: semitone): pixel;
  y2v(yPosition: pixel): semitone;
}

export interface MainEditorDisplay extends HorizontalDisplay, VerticalDisplay {}
export type ArrangementViewDisplay = HorizontalDisplay;

export interface MainEditorContext {
  readonly currentGroupReference: NoteGroupReference;
  readonly currentTrack: Track;
  readonly selection: MainEditorUserSelection;
  readonly view: MainEditorDisplay;
}

export interface ArrangementViewContext {
  readonly selection: ArrangementViewUserSelection;
  readonly view: ArrangementViewDisplay;
}

export interface ProjectContext {
  readonly allNoteGroups: NoteGroup[];
  addNoteGroup(group: NoteGroup, suggestedIndex?: number): number;
  removeNoteGroup(noteGroup: NoteGroup): void;
  findNoteGroupById(noteGroupId: string): NoteGroup | undefined;
  readonly allTracks: Track[];
  addTrack(track: Track): void;
  removeTrack(track: Track): void;
  readonly allMeasureMarks: MeasureMark[];
  setMeasureMarkAt(measureNumber: measure, nomin: number, denom: number): void;
  getMeasureMarkAt(measureNumber: measure): MeasureMark;
  getMeasureMarkAtBlick(timePoint: blick): MeasureMark;
  removeMeasureMarkAt(measureNumber: measure): boolean;
  readonly allTempoMarks: TempoMark[];
  setTempoMarkAt(timePoint: blick, bpm: number): void;
  getTempoMarkAt(timePoint: blick): TempoMark;
  removeTempoMarkAt(timePoint: blick): boolean;
}

export interface Context {
  clipboard: string;
  readonly osType: string;
  readonly osName: string;
  readonly hostName: string;
  readonly hostVersion: string;
  readonly hostVersionNumber: number;
  readonly languageCode: LanguageCode;
  readonly fileName: string;
  readonly duration: blick;
  currentTime: second;
  readonly playbackStatus: PlaybackStatus;
  readonly mainEditor: MainEditorContext;
  readonly arrangementView: ArrangementViewContext;
  readonly project: ProjectContext;
}
