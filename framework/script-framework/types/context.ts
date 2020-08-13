import { LanguageCode, MeasureMark, PlaybackStatus, TempoMark } from 'svstudio-scripts-typing';

import { blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../../types';

import { NoteGroupProxy, NoteGroupProxyBuilder } from './note-group-proxy';
import { InstrumentalReferenceProxy, NoteGroupReferenceProxy } from './note-group-reference-proxy';
import { NoteProxy } from './note-proxy';
import { TrackProxy, TrackProxyBuilder } from './track-proxy';

/**
 * A basic interface for selection states.
 *
 * @see https://dreamtonics.com/synthv/scripting/SelectionStateBase.html
 */
export interface UserContentSelection {
  /**
   * Check if there's any unfinished edit on the selected objects.
   * <br>
   * For example, this will return true if the user is dragging around a few notes/control points but has not yet released the mouse.
   *
   * @see https://dreamtonics.com/synthv/scripting/SelectionStateBase.html#hasUnfinishedEdits
   */
  readonly hasUnfinishedEdits: boolean;

  /**
   * Unselects all object types supported by this selection state. Return true if the selection has changed.
   *
   * @see https://dreamtonics.com/synthv/scripting/SelectionStateBase.html#clearAll
   */
  removeAllSelected(): void;
}

/**
 * A collection of note group selection behaviors.
 *
 * @see https://dreamtonics.com/synthv/scripting/GroupSelection.html
 */
export interface UserNoteGroupSelection {
  /**
   * Get/set an array of selected {@link NoteGroupReferenceProxy} following the order of selection.
   *
   * @see https://dreamtonics.com/synthv/scripting/GroupSelection.html
   */
  noteGroupReferences?: readonly (InstrumentalReferenceProxy | NoteGroupReferenceProxy)[];

  /**
   * Add a {@link NoteGroupReferenceProxy} to the selection.
   * <br>
   * The argument must be part of the currently open project.
   *
   * @see https://dreamtonics.com/synthv/scripting/GroupSelection.html#selectGroup
   * @param noteGroupReference - `NoteGroupReference` to select.
   */
  addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void;

  /**
   * Unselect a {@link NoteGroupReferenceProxy}. Return true if the selection has changed.
   *
   * @see https://dreamtonics.com/synthv/scripting/GroupSelection.html#unselectGroup
   * @param noteGroupReference - `NoteGroupReference` to unselect.
   */
  removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean;

  /**
   * Unselect all {@link NoteGroupReferenceProxy}. Return true if the selection has changed.
   *
   * @see https://dreamtonics.com/synthv/scripting/GroupSelection.html#clearGroups
   */
  removeAllGroupReferences(): boolean;
}

/**
 * A collection of note selection behaviors.
 *
 * @see https://dreamtonics.com/synthv/scripting/TrackInnerSelectionState.html
 */
export interface UserNoteSelection {
  /**
   * Get/set an array of selected {@link NoteProxy} following the order of selection.
   *
   * @see https://dreamtonics.com/synthv/scripting/TrackInnerSelectionState.html#getSelectedNotes
   */
  notes?: readonly NoteProxy[];

  /**
   * Select a {@link NoteProxy}.
   * The note must be inside the current {@link NoteGroupReferenceProxy} opened in the piano roll.
   *
   * @see https://dreamtonics.com/synthv/scripting/TrackInnerSelectionState.html#selectNote
   * @param note - `NoteProxy` to select.
   */
  addNote(note: NoteProxy): void;

  /**
   * Unselect a {@link NoteProxy}. Return true if the selection has changed.
   *
   * @see https://dreamtonics.com/synthv/scripting/TrackInnerSelectionState.html#unselectNote
   * @param note - `NoteProxy` to unselect.
   */
  removeNote(note: NoteProxy): boolean;

  /**
   * Unselect all notes. Return true if the selection has changed.
   *
   * @see https://dreamtonics.com/synthv/scripting/TrackInnerSelectionState.html#clearNotes
   */
  removeAllNotes(): boolean;
}

/**
 * An interface to describe what selections in the main editor (piano roll) area supports.
 */
export interface MainEditorUserSelection extends UserContentSelection, UserNoteGroupSelection, UserNoteSelection {}

/**
 * An interface to describe what selections in the arrangement view area supports.
 */
export interface ArrangementViewUserSelection extends UserContentSelection, UserNoteGroupSelection {}

/**
 * An interface to describe functions supported in the UI in the horizontal direction.
 */
export interface HorizontalDisplay {
  /**
   * Get the scaling factor in the horizontal direction.
   * <br>
   * The unit is pixels per blick so expect this to be a very small number.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getTimePxPerUnit
   */
  timeScale: pixelPerBlick;

  /**
   * Get/set the left end of the current visible time range.
   * The time unit is blicks.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getTimeViewRange
   */
  timeLeft: blick;

  /**
   * Get/set the right end of the current visible time range.
   * The time unit is blicks.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getTimeViewRange
   */
  timeRight: blick;

  /**
   * Round a time position b based on snapping settings.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#snap
   * @param timePoint - A point in time to be rounded
   */
  snap(timePoint: blick): blick;

  /**
   * Convert a time position to an x-position (pixels).
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#t2x
   * @param timePoint - A blick value to convert.
   */
  t2x(timePoint: blick): pixel;

  /**
   * Convert an x-position (pixels) to a time position.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#x2t
   * @param xPosition - A pixel value to convert.
   */
  x2t(xPosition: pixel): blick;
}

/**
 * An interface to describe functions supported in the UI in the vertical direction.
 */
export interface VerticalDisplay {
  /**
   * Get the scaling factor in the vertical direction.
   * <br>
   * The unit is pixels per semitone.
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getValuePxPerUnit
   */
  readonly valueScale: pixelPerSemitone;

  /**
   * Get the top value of the current visible value range.
   * The unit is MIDI number (semitones).
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getValueViewRange
   */
  readonly valueTop: semitone;

  /**
   * Get the bottom value of the current visible value range.
   * The unit is MIDI number (semitones).
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#getValueViewRange
   */
  readonly valueBottom: semitone;

  /**
   * Get/set the center value of the current visible value range.
   * The unit is MIDI number (semitones).
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#setValueCenter
   */
  valueCenter: semitone;

  /**
   * Convert a value to a y-position (pixels).
   * @param valuePoint - A semitone value to convert
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#v2y
   */
  v2y(valuePoint: semitone): pixel;

  /**
   * Convert a y-position (pixels) to a value.
   * @param yPosition - A pixel value to convert
   *
   * @see https://dreamtonics.com/synthv/scripting/CoordinateSystem.html#y2v
   */
  y2v(yPosition: pixel): semitone;
}

/**
 * An interface to describe what the main editor (piano roll) UI supports.
 */
export interface MainEditorDisplay extends HorizontalDisplay, VerticalDisplay {}

/**
 * A type alias to describe what the arrangement view UI supports.
 */
export type ArrangementViewDisplay = HorizontalDisplay;

/**
 * An interface to describe combine the main editor (piano roll) selection and UI.
 */
export interface MainEditorContext {
  /**
   * Get the selection state object.
   */
  readonly selection: MainEditorUserSelection;

  /**
   * Get the UI object.
   */
  readonly view: MainEditorDisplay;
}

/**
 * An interface to describe combine the arrangement view selection and UI.
 */
export interface ArrangementViewContext {
  /**
   * Get the selection state object.
   */
  readonly selection: ArrangementViewUserSelection;

  /**
   * Get the UI object.
   */
  readonly view: ArrangementViewDisplay;
}

/**
 * A project contains the highest-level information in the current session.
 *
 * @see https://dreamtonics.com/synthv/scripting/Project.html
 */
export interface ProjectContext {
  /**
   * Get an array of {@link NoteGroupProxy} that are known to this project.
   */
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
  readonly hostName: 'Synthesizer V Studio Pro' | 'Synthesizer V Studio Basic';
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
