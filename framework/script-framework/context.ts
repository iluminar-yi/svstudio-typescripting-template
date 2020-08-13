import { HostInfo, LanguageCode, MeasureMark, PlaybackStatus, TempoMark } from 'svstudio-scripts-typing';

import { ManagedSynthV, blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../types';

import { createNoteGroupProxyBuilder, noteGroupProxyOf } from './note-group-proxy';
import { instrumentalOrNoteGroupReferenceProxyOf, noteGroupReferenceProxyOf } from './note-group-reference-proxy';
import { noteProxyOf } from './note-proxy';
import { createTrackProxyBuilder, trackProxyOf } from './track-proxy';
import {
  ArrangementViewDisplay,
  ArrangementViewUserSelection,
  Context,
  InstrumentalReferenceProxy,
  MainEditorDisplay,
  MainEditorUserSelection,
  NoteGroupProxy,
  NoteGroupProxyBuilder,
  NoteGroupReferenceProxy,
  NoteProxy,
} from './types';
import { TrackProxy, TrackProxyBuilder } from './types/track-proxy';

export const contextFactory = (SV: ManagedSynthV): Context => {
  const project = SV.getProject();
  const playbackControl = SV.getPlayback();
  const mainEditor = SV.getMainEditor();
  const arrangementView = SV.getArrangement();
  const timeAxis = project.getTimeAxis();

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
    get currentTimePoint(): blick {
      return timeAxis.getBlickFromSeconds(playbackControl.getPlayhead());
    },
    set currentTimePoint(time: blick) {
      playbackControl.seek(timeAxis.getSecondsFromBlick(time));
    },
    get currentNoteGroupReference(): NoteGroupReferenceProxy {
      return noteGroupReferenceProxyOf(mainEditor.getCurrentGroup());
    },
    get currentTrack(): TrackProxy {
      return trackProxyOf(mainEditor.getCurrentTrack());
    },
    get playbackStatus(): PlaybackStatus {
      return playbackControl.getStatus();
    },
    mainEditor: {
      get selection(): MainEditorUserSelection {
        return {
          get hasUnfinishedEdits(): boolean {
            return mainEditor.getSelection().hasUnfinishedEdits();
          },
          removeAllSelected(): boolean {
            return mainEditor.getSelection().clearAll();
          },
          noteGroupReferences: mainEditor.getSelection().hasSelectedGroups()
            ? mainEditor
                .getSelection()
                .getSelectedGroups()
                .map(noteGroupReferenceProxyOf)
            : undefined,
          addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void {
            mainEditor.getSelection().selectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean {
            return mainEditor.getSelection().unselectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeAllGroupReferences(): boolean {
            return mainEditor.getSelection().clearGroups();
          },
          get notes(): readonly NoteProxy[] | undefined {
            return SV.getMainEditor()
              .getSelection()
              .hasSelectedNotes()
              ? mainEditor
                  .getSelection()
                  .getSelectedNotes()
                  .map(noteProxyOf)
              : undefined;
          },
          set notes(notes: readonly NoteProxy[] | undefined) {
            mainEditor.getSelection().clearNotes();
            if (notes) {
              notes.forEach((note: NoteProxy): void => mainEditor.getSelection().selectNote(note._rawNote()));
            }
          },
          addNote(note: NoteProxy): void {
            mainEditor.getSelection().selectNote(note._rawNote());
          },
          removeNote(note: NoteProxy): boolean {
            return mainEditor.getSelection().unselectNote(note._rawNote());
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
          set timeLeft(timePoint: blick) {
            mainEditor.getNavigation().setTimeLeft(timePoint);
          },
          get timeRight(): blick {
            return mainEditor.getNavigation().getTimeViewRange()[1];
          },
          set timeRight(timePoint: blick) {
            mainEditor.getNavigation().setTimeRight(timePoint);
          },
          snap(timePoint: blick): blick {
            return mainEditor.getNavigation().snap(timePoint);
          },
          t2x(timePoint: blick): pixel {
            return mainEditor.getNavigation().t2x(timePoint);
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
      get allNoteGroups(): NoteGroupProxy[] {
        const noteGroups: NoteGroupProxy[] = [];
        for (let i = 0; i < project.getNumNoteGroupsInLibrary(); i++) {
          const noteGroup = project.getNoteGroup(i);
          if (!noteGroup) {
            throw new Error(`It's impossible to have undefined NoteGroup here`);
          }
          noteGroups.push(noteGroupProxyOf(noteGroup));
        }
        return noteGroups;
      },
      addNoteGroup(group: NoteGroupProxy, suggestedIndex?: number): number {
        return project.addNoteGroup(group._rawNoteGroup(), suggestedIndex);
      },
      removeNoteGroup(noteGroup: NoteGroupProxy): void {
        project.removeNoteGroup(noteGroup._rawNoteGroup().getIndexInParent());
      },
      findNoteGroupById(noteGroupId: string): NoteGroupProxy | undefined {
        const noteGroup = project.getNoteGroup(noteGroupId);
        if (noteGroup) {
          return noteGroupProxyOf(noteGroup);
        }
      },
      get allTracks(): TrackProxy[] {
        const tracks: TrackProxy[] = [];
        for (let i = 0; i < project.getNumTracks(); i++) {
          const track = project.getTrack(i);
          tracks.push(trackProxyOf(track));
        }
        return tracks.sort((a, b): number => a.displayOrder - b.displayOrder);
      },
      addTrack(track: TrackProxy): void {
        project.addTrack(track._rawTrack());
      },
      removeTrack(track: TrackProxy): void {
        project.removeTrack(track._rawTrack().getIndexInParent());
      },
      get allMeasureMarks(): MeasureMark[] {
        return timeAxis.getAllMeasureMarks();
      },
      setMeasureMarkAt(measureNumber: measure, nomin: number, denom: number): void {
        timeAxis.addMeasureMark(measureNumber, nomin, denom);
      },
      getMeasureMarkAt(measureNumber: measure): MeasureMark {
        return timeAxis.getMeasureMarkAt(measureNumber);
      },
      getMeasureMarkAtBlick(timePoint: blick): MeasureMark {
        return timeAxis.getMeasureMarkAtBlick(timePoint);
      },
      removeMeasureMarkAt(measureNumber: measure): boolean {
        return timeAxis.removeMeasureMark(measureNumber);
      },
      get allTempoMarks(): TempoMark[] {
        return timeAxis.getAllTempoMarks();
      },
      setTempoMarkAt(timePoint: blick, bpm: number): void {
        return timeAxis.addTempoMark(timePoint, bpm);
      },
      getTempoMarkAt(timePoint: blick): TempoMark {
        return timeAxis.getTempoMarkAt(timePoint);
      },
      removeTempoMarkAt(timePoint: blick): boolean {
        return timeAxis.removeTempoMark(timePoint);
      },
      newNoteGroup(): NoteGroupProxyBuilder {
        return createNoteGroupProxyBuilder(project);
      },
      newTrack(): TrackProxyBuilder {
        return createTrackProxyBuilder(project);
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
          get noteGroupReferences(): readonly (InstrumentalReferenceProxy | NoteGroupReferenceProxy)[] | undefined {
            return arrangementView.getSelection().hasSelectedGroups()
              ? arrangementView
                  .getSelection()
                  .getSelectedGroups()
                  .map(instrumentalOrNoteGroupReferenceProxyOf)
              : undefined;
          },
          set noteGroupReferences(
            noteGroupReferences: readonly (InstrumentalReferenceProxy | NoteGroupReferenceProxy)[] | undefined,
          ) {
            if (noteGroupReferences && noteGroupReferences[0].instrumental) {
              throw new Error('Cannot set instrumental note group reference!');
            } else {
              arrangementView.getSelection().clearGroups();
              if (noteGroupReferences) {
                (noteGroupReferences as NoteGroupReferenceProxy[]).forEach(
                  (noteGroupReference: NoteGroupReferenceProxy): void =>
                    arrangementView.getSelection().selectGroup(noteGroupReference._rawNoteGroupReference()),
                );
              }
            }
          },
          addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void {
            arrangementView.getSelection().selectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean {
            return arrangementView.getSelection().unselectGroup(noteGroupReference._rawNoteGroupReference());
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
          set timeLeft(timePoint: blick) {
            arrangementView.getNavigation().setTimeLeft(timePoint);
          },
          get timeRight(): blick {
            return arrangementView.getNavigation().getTimeViewRange()[1];
          },
          set timeRight(timePoint: blick) {
            arrangementView.getNavigation().setTimeRight(timePoint);
          },
          snap(timePoint: blick): blick {
            return arrangementView.getNavigation().snap(timePoint);
          },
          t2x(timePoint: blick): pixel {
            return arrangementView.getNavigation().t2x(timePoint);
          },
          x2t(xPosition: pixel): blick {
            return arrangementView.getNavigation().x2t(xPosition);
          },
        };
      },
    },
  };
};
