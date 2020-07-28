import {
  HostInfo,
  LanguageCode,
  MeasureMark,
  Note,
  NoteGroup,
  NoteGroupReference,
  PlaybackStatus,
  TempoMark,
  Track,
} from 'svstudio-scripts-typing';

import { ManagedSynthV, blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../types';

import { Context } from './types';
import {
  ArrangementViewDisplay,
  ArrangementViewUserSelection,
  MainEditorDisplay,
  MainEditorUserSelection,
} from './types/context';

export const contextFactory = (SV: ManagedSynthV): Context => {
  const project = SV.getProject();
  const playbackControl = SV.getPlayback();
  const mainEditor = SV.getMainEditor();
  const arrangementView = SV.getArrangement();

  return {
    get clipboard(): string {
      return SV.getHostClipboard();
    },
    set clipboard(text: string) {
      SV.setHostClipboard(text);
    },
    get osType(): HostInfo['osType'] {
      return SV.getHostInfo().osType;
    },
    get osName(): HostInfo['osName'] {
      return SV.getHostInfo().osName;
    },
    get hostName(): HostInfo['hostName'] {
      return SV.getHostInfo().hostName;
    },
    get hostVersion(): HostInfo['hostVersion'] {
      return SV.getHostInfo().hostVersion;
    },
    get hostVersionNumber(): HostInfo['hostVersionNumber'] {
      return SV.getHostInfo().hostVersionNumber;
    },
    get languageCode(): LanguageCode {
      return SV.getHostInfo().languageCode;
    },
    get fileName(): string {
      return project.getFileName();
    },
    get duration(): blick {
      return project.getDuration();
    },
    get currentTime(): second {
      return playbackControl.getPlayhead();
    },
    set currentTime(time: second) {
      playbackControl.seek(time);
    },
    get playbackStatus(): PlaybackStatus {
      return playbackControl.getStatus();
    },
    mainEditor: {
      get currentGroupReference(): NoteGroupReference {
        return mainEditor.getCurrentGroup();
      },
      get currentTrack(): Track {
        return mainEditor.getCurrentTrack();
      },
      get selection(): MainEditorUserSelection {
        return {
          get hasUnfinishedEdits(): boolean {
            return mainEditor.getSelection().hasUnfinishedEdits();
          },
          removeAllSelected(): boolean {
            return mainEditor.getSelection().clearAll();
          },
          noteGroupReferences: mainEditor.getSelection().hasSelectedGroups()
            ? mainEditor.getSelection().getSelectedGroups()
            : undefined,
          addGroupReference(noteGroupReference: NoteGroupReference): void {
            mainEditor.getSelection().selectGroup(noteGroupReference);
          },
          removeGroupReference(noteGroupReference: NoteGroupReference): boolean {
            return mainEditor.getSelection().unselectGroup(noteGroupReference);
          },
          removeAllGroupReferences(): boolean {
            return mainEditor.getSelection().clearGroups();
          },
          notes: SV.getMainEditor()
            .getSelection()
            .hasSelectedNotes()
            ? mainEditor.getSelection().getSelectedNotes()
            : undefined,
          addNote(note: Note): void {
            mainEditor.getSelection().selectNote(note);
          },
          removeNote(note: Note): boolean {
            return mainEditor.getSelection().unselectNote(note);
          },
          removeAllNotes(): boolean {
            return mainEditor.getSelection().clearNotes();
          },
        };
      },
      get view(): MainEditorDisplay {
        return {
          get timeScale(): pixelPerBlick {
            return mainEditor.getNavigation().getTimePxPerUnit();
          },
          set timeScale(scale: pixelPerBlick) {
            mainEditor.getNavigation().setTimeScale(scale);
          },
          get timeLeft(): blick {
            return mainEditor.getNavigation().getTimeViewRange()[0];
          },
          set timeLeft(timePosition: blick) {
            mainEditor.getNavigation().setTimeLeft(timePosition);
          },
          get timeRight(): blick {
            return mainEditor.getNavigation().getTimeViewRange()[1];
          },
          set timeRight(timePosition: blick) {
            mainEditor.getNavigation().setTimeRight(timePosition);
          },
          snap(timePosition: blick): blick {
            return mainEditor.getNavigation().snap(timePosition);
          },
          t2x(timePosition: blick): pixel {
            return mainEditor.getNavigation().t2x(timePosition);
          },
          x2t(xPosition: pixel): blick {
            return mainEditor.getNavigation().x2t(xPosition);
          },
          get valueScale(): pixelPerSemitone {
            return mainEditor.getNavigation().getValuePxPerUnit();
          },
          get valueTop(): semitone {
            return mainEditor.getNavigation().getValueViewRange()[1];
          },
          get valueBottom(): semitone {
            return mainEditor.getNavigation().getValueViewRange()[0];
          },
          get valueCenter(): semitone {
            const [top, bottom] = mainEditor.getNavigation().getValueViewRange();
            return (top + bottom) / 2;
          },
          set valueCenter(valuePoint: semitone) {
            mainEditor.getNavigation().setValueCenter(valuePoint);
          },
          v2y(valuePoint: semitone): pixel {
            return mainEditor.getNavigation().v2y(valuePoint);
          },
          y2v(yPosition: pixel): semitone {
            return mainEditor.getNavigation().y2v(yPosition);
          },
        };
      },
    },
    project: {
      get allNoteGroups(): NoteGroup[] {
        const noteGroups: NoteGroup[] = [];
        for (let i = 0; i < project.getNumNoteGroupsInLibrary(); i++) {
          const noteGroup = project.getNoteGroup(i);
          if (!noteGroup) {
            throw new Error(`It's impossible to have undefined NoteGroup here`);
          }
          noteGroups.push(noteGroup);
        }
        return noteGroups;
      },
      addNoteGroup(group: NoteGroup, suggestedIndex?: number): number {
        return project.addNoteGroup(group, suggestedIndex);
      },
      removeNoteGroup(noteGroup: NoteGroup): void {
        project.removeNoteGroup(noteGroup.getIndexInParent());
      },
      findNoteGroupById(noteGroupId: string): NoteGroup | undefined {
        return project.getNoteGroup(noteGroupId);
      },
      get allTracks(): Track[] {
        const tracks: Track[] = [];
        for (let i = 0; i < project.getNumTracks(); i++) {
          const track = project.getTrack(i);
          tracks.push(track);
        }
        return tracks.sort((a, b): number => a.getDisplayOrder() - b.getDisplayOrder());
      },
      addTrack(track: Track): void {
        project.addTrack(track);
      },
      removeTrack(track: Track): void {
        project.removeTrack(track.getIndexInParent());
      },
      get allMeasureMarks(): MeasureMark[] {
        return project.getTimeAxis().getAllMeasureMarks();
      },
      setMeasureMarkAt(measureNumber: measure, nomin: number, denom: number): void {
        project.getTimeAxis().addMeasureMark(measureNumber, nomin, denom);
      },
      getMeasureMarkAt(measureNumber: measure): MeasureMark {
        return project.getTimeAxis().getMeasureMarkAt(measureNumber);
      },
      getMeasureMarkAtBlick(timePoint: blick): MeasureMark {
        return project.getTimeAxis().getMeasureMarkAtBlick(timePoint);
      },
      removeMeasureMarkAt(measureNumber: measure): boolean {
        return project.getTimeAxis().removeMeasureMark(measureNumber);
      },
      get allTempoMarks(): TempoMark[] {
        return project.getTimeAxis().getAllTempoMarks();
      },
      setTempoMarkAt(timePoint: blick, bpm: number): void {
        return project.getTimeAxis().addTempoMark(timePoint, bpm);
      },
      getTempoMarkAt(timePoint: blick): TempoMark {
        return project.getTimeAxis().getTempoMarkAt(timePoint);
      },
      removeTempoMarkAt(timePoint: blick): boolean {
        return project.getTimeAxis().removeTempoMark(timePoint);
      },
    },
    arrangementView: {
      get selection(): ArrangementViewUserSelection {
        return {
          get hasUnfinishedEdits(): boolean {
            return arrangementView.getSelection().hasUnfinishedEdits();
          },
          removeAllSelected(): boolean {
            return arrangementView.getSelection().clearAll();
          },
          noteGroupReferences: arrangementView.getSelection().hasSelectedGroups()
            ? arrangementView.getSelection().getSelectedGroups()
            : undefined,
          addGroupReference(noteGroupReference: NoteGroupReference): void {
            arrangementView.getSelection().selectGroup(noteGroupReference);
          },
          removeGroupReference(noteGroupReference: NoteGroupReference): boolean {
            return arrangementView.getSelection().unselectGroup(noteGroupReference);
          },
          removeAllGroupReferences(): boolean {
            return arrangementView.getSelection().clearGroups();
          },
        };
      },
      get view(): ArrangementViewDisplay {
        return {
          get timeScale(): pixelPerBlick {
            return arrangementView.getNavigation().getTimePxPerUnit();
          },
          set timeScale(scale: pixelPerBlick) {
            arrangementView.getNavigation().setTimeScale(scale);
          },
          get timeLeft(): blick {
            return arrangementView.getNavigation().getTimeViewRange()[0];
          },
          set timeLeft(timePosition: blick) {
            arrangementView.getNavigation().setTimeLeft(timePosition);
          },
          get timeRight(): blick {
            return arrangementView.getNavigation().getTimeViewRange()[1];
          },
          set timeRight(timePosition: blick) {
            arrangementView.getNavigation().setTimeRight(timePosition);
          },
          snap(timePosition: blick): blick {
            return arrangementView.getNavigation().snap(timePosition);
          },
          t2x(timePosition: blick): pixel {
            return arrangementView.getNavigation().t2x(timePosition);
          },
          x2t(xPosition: pixel): blick {
            return arrangementView.getNavigation().x2t(xPosition);
          },
        };
      },
    },
  };
};
