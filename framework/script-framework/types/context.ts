import { LanguageCode, MeasureMark, PlaybackStatus, TempoMark } from 'svstudio-scripts-typing';

import { blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../../types';

import { NoteGroupProxy, NoteGroupProxyBuilder } from './note-group-proxy';
import { InstrumentalReferenceProxy, NoteGroupReferenceProxy } from './note-group-reference-proxy';
import { NoteProxy } from './note-proxy';
import { TrackProxy, TrackProxyBuilder } from './track-proxy';

export interface UserContentSelection {
  readonly hasUnfinishedEdits: boolean;
  removeAllSelected(): void;
}

export interface UserNoteGroupSelection {
  readonly noteGroupReferences?: (InstrumentalReferenceProxy | NoteGroupReferenceProxy)[];
  addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void;
  removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean;
  removeAllGroupReferences(): boolean;
}

export interface UserNoteSelection {
  readonly notes?: NoteProxy[];
  addNote(note: NoteProxy): void;
  removeNote(note: NoteProxy): boolean;
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
  readonly selection: MainEditorUserSelection;
  readonly view: MainEditorDisplay;
}

export interface ArrangementViewContext {
  readonly selection: ArrangementViewUserSelection;
  readonly view: ArrangementViewDisplay;
}

export interface ProjectContext {
  readonly allNoteGroups: NoteGroupProxy[];
  addNoteGroup(group: NoteGroupProxy, suggestedIndex?: number): number;
  removeNoteGroup(noteGroup: NoteGroupProxy): void;
  findNoteGroupById(noteGroupId: string): NoteGroupProxy | undefined;
  readonly allTracks: TrackProxy[];
  addTrack(track: TrackProxy): void;
  removeTrack(track: TrackProxy): void;
  readonly allMeasureMarks: MeasureMark[];
  setMeasureMarkAt(measureNumber: measure, nomin: number, denom: number): void;
  getMeasureMarkAt(measureNumber: measure): MeasureMark;
  getMeasureMarkAtBlick(timePoint: blick): MeasureMark;
  removeMeasureMarkAt(measureNumber: measure): boolean;
  readonly allTempoMarks: TempoMark[];
  setTempoMarkAt(timePoint: blick, bpm: number): void;
  getTempoMarkAt(timePoint: blick): TempoMark;
  removeTempoMarkAt(timePoint: blick): boolean;
  newNoteGroup(): NoteGroupProxyBuilder;
  newTrack(): TrackProxyBuilder;
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
  currentTimePoint: blick;
  readonly currentNoteGroupReference: NoteGroupReferenceProxy;
  readonly currentTrack: TrackProxy;
  readonly playbackStatus: PlaybackStatus;
  readonly mainEditor: MainEditorContext;
  readonly arrangementView: ArrangementViewContext;
  readonly project: ProjectContext;
}
