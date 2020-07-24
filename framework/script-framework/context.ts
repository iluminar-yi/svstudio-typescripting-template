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

import { SV } from '../_global';
import { blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../types';

import { Context } from './types';
import {
  ArrangementViewDisplay,
  ArrangementViewUserSelection,
  MainEditorDisplay,
  MainEditorUserSelection,
} from './types/context';

export const context: Context = {
  get clipboard(): string {
    return SV.getHostClipboard();
  },
  set clipboard(text: string) {
    SV.setHostClipboard(text);
  },
  osType: SV.getHostInfo().osType,
  osName: SV.getHostInfo().osName,
  hostName: SV.getHostInfo().hostName,
  hostVersion: SV.getHostInfo().hostVersion,
  hostVersionNumber: SV.getHostInfo().hostVersionNumber,
  get languageCode(): LanguageCode {
    return SV.getHostInfo().languageCode;
  },
  fileName: SV.getProject().getFileName(),
  get duration(): blick {
    return SV.getProject().getDuration();
  },
  get currentTime(): second {
    return SV.getPlayback().getPlayhead();
  },
  set currentTime(time: second) {
    SV.getPlayback().seek(time);
  },
  get playbackStatus(): PlaybackStatus {
    return SV.getPlayback().getStatus();
  },
  mainEditor: {
    get currentGroupReference(): NoteGroupReference {
      return SV.getMainEditor().getCurrentGroup();
    },
    get currentTrack(): Track {
      return SV.getMainEditor().getCurrentTrack();
    },
    get selection(): MainEditorUserSelection {
      return {
        get hasUnfinishedEdits(): boolean {
          return SV.getMainEditor()
            .getSelection()
            .hasUnfinishedEdits();
        },
        removeAllSelected(): boolean {
          return SV.getMainEditor()
            .getSelection()
            .clearAll();
        },
        noteGroupReferences: SV.getMainEditor()
          .getSelection()
          .hasSelectedGroups()
          ? SV.getMainEditor()
              .getSelection()
              .getSelectedGroups()
          : undefined,
        addGroupReference(noteGroupReference: NoteGroupReference): void {
          SV.getMainEditor()
            .getSelection()
            .selectGroup(noteGroupReference);
        },
        removeGroupReference(noteGroupReference: NoteGroupReference): boolean {
          return SV.getMainEditor()
            .getSelection()
            .unselectGroup(noteGroupReference);
        },
        removeAllGroupReferences(): boolean {
          return SV.getMainEditor()
            .getSelection()
            .clearGroups();
        },
        notes: SV.getMainEditor()
          .getSelection()
          .hasSelectedNotes()
          ? SV.getMainEditor()
              .getSelection()
              .getSelectedNotes()
          : undefined,
        addNote(note: Note): void {
          SV.getMainEditor()
            .getSelection()
            .selectNote(note);
        },
        removeNote(note: Note): boolean {
          return SV.getMainEditor()
            .getSelection()
            .unselectNote(note);
        },
        removeAllNotes(): boolean {
          return SV.getMainEditor()
            .getSelection()
            .clearNotes();
        },
      };
    },
    get view(): MainEditorDisplay {
      return {
        get timeScale(): pixelPerBlick {
          return SV.getMainEditor()
            .getNavigation()
            .getTimePxPerUnit();
        },
        set timeScale(scale: pixelPerBlick) {
          SV.getMainEditor()
            .getNavigation()
            .setTimeScale(scale);
        },
        get timeLeft(): blick {
          return SV.getMainEditor()
            .getNavigation()
            .getTimeViewRange()[0];
        },
        set timeLeft(timePosition: blick) {
          SV.getMainEditor()
            .getNavigation()
            .setTimeLeft(timePosition);
        },
        get timeRight(): blick {
          return SV.getMainEditor()
            .getNavigation()
            .getTimeViewRange()[1];
        },
        set timeRight(timePosition: blick) {
          SV.getMainEditor()
            .getNavigation()
            .setTimeRight(timePosition);
        },
        snap(timePosition: blick): blick {
          return SV.getMainEditor()
            .getNavigation()
            .snap(timePosition);
        },
        t2x(timePosition: blick): pixel {
          return SV.getMainEditor()
            .getNavigation()
            .t2x(timePosition);
        },
        x2t(xPosition: pixel): blick {
          return SV.getMainEditor()
            .getNavigation()
            .x2t(xPosition);
        },
        get valueScale(): pixelPerSemitone {
          return SV.getMainEditor()
            .getNavigation()
            .getValuePxPerUnit();
        },
        get valueTop(): semitone {
          return SV.getMainEditor()
            .getNavigation()
            .getValueViewRange()[1];
        },
        get valueBottom(): semitone {
          return SV.getMainEditor()
            .getNavigation()
            .getValueViewRange()[0];
        },
        get valueCenter(): semitone {
          const [top, bottom] = SV.getMainEditor()
            .getNavigation()
            .getValueViewRange();
          return (top + bottom) / 2;
        },
        set valueCenter(valuePoint: semitone) {
          SV.getMainEditor()
            .getNavigation()
            .setValueCenter(valuePoint);
        },
        v2y(valuePoint: semitone): pixel {
          return SV.getMainEditor()
            .getNavigation()
            .v2y(valuePoint);
        },
        y2v(yPosition: pixel): semitone {
          return SV.getMainEditor()
            .getNavigation()
            .y2v(yPosition);
        },
      };
    },
  },
  project: {
    get allNoteGroups(): NoteGroup[] {
      const noteGroups: NoteGroup[] = [];
      for (let i = 0; i < SV.getProject().getNumNoteGroupsInLibrary(); i++) {
        const noteGroup = SV.getProject().getNoteGroup(i);
        if (!noteGroup) {
          throw new Error(`It's impossible to have undefined NoteGroup here`);
        }
        noteGroups.push(noteGroup);
      }
      return noteGroups;
    },
    addNoteGroup(group: NoteGroup, suggestedIndex?: number): number {
      return SV.getProject().addNoteGroup(group, suggestedIndex);
    },
    removeNoteGroup(noteGroup: NoteGroup): void {
      SV.getProject().removeNoteGroup(noteGroup.getIndexInParent());
    },
    findNoteGroupById(noteGroupId: string): NoteGroup | undefined {
      return SV.getProject().getNoteGroup(noteGroupId);
    },
    get allTracks(): Track[] {
      const tracks: Track[] = [];
      for (let i = 0; i < SV.getProject().getNumTracks(); i++) {
        const track = SV.getProject().getTrack(i);
        tracks.push(track);
      }
      return tracks.sort((a, b): number => a.getDisplayOrder() - b.getDisplayOrder());
    },
    addTrack(track: Track): void {
      SV.getProject().addTrack(track);
    },
    removeTrack(track: Track): void {
      SV.getProject().removeTrack(track.getIndexInParent());
    },
    get allMeasureMarks(): MeasureMark[] {
      return SV.getProject()
        .getTimeAxis()
        .getAllMeasureMarks();
    },
    setMeasureMarkAt(measureNumber: measure, nomin: number, denom: number): void {
      SV.getProject()
        .getTimeAxis()
        .addMeasureMark(measureNumber, nomin, denom);
    },
    getMeasureMarkAt(measureNumber: measure): MeasureMark {
      return SV.getProject()
        .getTimeAxis()
        .getMeasureMarkAt(measureNumber);
    },
    getMeasureMarkAtBlick(timePoint: blick): MeasureMark {
      return SV.getProject()
        .getTimeAxis()
        .getMeasureMarkAtBlick(timePoint);
    },
    removeMeasureMarkAt(measureNumber: measure): boolean {
      return SV.getProject()
        .getTimeAxis()
        .removeMeasureMark(measureNumber);
    },
    get allTempoMarks(): TempoMark[] {
      return SV.getProject()
        .getTimeAxis()
        .getAllTempoMarks();
    },
    setTempoMarkAt(timePoint: blick, bpm: number): void {
      return SV.getProject()
        .getTimeAxis()
        .addTempoMark(timePoint, bpm);
    },
    getTempoMarkAt(timePoint: blick): TempoMark {
      return SV.getProject()
        .getTimeAxis()
        .getTempoMarkAt(timePoint);
    },
    removeTempoMarkAt(timePoint: blick): boolean {
      return SV.getProject()
        .getTimeAxis()
        .removeTempoMark(timePoint);
    },
  },
  arrangementView: {
    get selection(): ArrangementViewUserSelection {
      return {
        get hasUnfinishedEdits(): boolean {
          return SV.getArrangement()
            .getSelection()
            .hasUnfinishedEdits();
        },
        removeAllSelected(): boolean {
          return SV.getArrangement()
            .getSelection()
            .clearAll();
        },
        noteGroupReferences: SV.getArrangement()
          .getSelection()
          .hasSelectedGroups()
          ? SV.getArrangement()
              .getSelection()
              .getSelectedGroups()
          : undefined,
        addGroupReference(noteGroupReference: NoteGroupReference): void {
          SV.getArrangement()
            .getSelection()
            .selectGroup(noteGroupReference);
        },
        removeGroupReference(noteGroupReference: NoteGroupReference): boolean {
          return SV.getArrangement()
            .getSelection()
            .unselectGroup(noteGroupReference);
        },
        removeAllGroupReferences(): boolean {
          return SV.getArrangement()
            .getSelection()
            .clearGroups();
        },
      };
    },
    get view(): ArrangementViewDisplay {
      return {
        get timeScale(): pixelPerBlick {
          return SV.getArrangement()
            .getNavigation()
            .getTimePxPerUnit();
        },
        set timeScale(scale: pixelPerBlick) {
          SV.getArrangement()
            .getNavigation()
            .setTimeScale(scale);
        },
        get timeLeft(): blick {
          return SV.getArrangement()
            .getNavigation()
            .getTimeViewRange()[0];
        },
        set timeLeft(timePosition: blick) {
          SV.getArrangement()
            .getNavigation()
            .setTimeLeft(timePosition);
        },
        get timeRight(): blick {
          return SV.getArrangement()
            .getNavigation()
            .getTimeViewRange()[1];
        },
        set timeRight(timePosition: blick) {
          SV.getArrangement()
            .getNavigation()
            .setTimeRight(timePosition);
        },
        snap(timePosition: blick): blick {
          return SV.getArrangement()
            .getNavigation()
            .snap(timePosition);
        },
        t2x(timePosition: blick): pixel {
          return SV.getArrangement()
            .getNavigation()
            .t2x(timePosition);
        },
        x2t(xPosition: pixel): blick {
          return SV.getArrangement()
            .getNavigation()
            .x2t(xPosition);
        },
      };
    },
  },
};
