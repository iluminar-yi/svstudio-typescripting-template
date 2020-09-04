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
      return SV.getProject().getFileName();
    },
    get duration(): blick {
      return SV.getProject().getDuration();
    },
    get currentTime(): second {
      return SV.getPlayback().getPlayhead();
    },
    set currentTime(time: second) {
      SV.getPlayback().seek(time);
    },
    get currentTimePoint(): blick {
      return SV.getProject()
        .getTimeAxis()
        .getBlickFromSeconds(SV.getPlayback().getPlayhead());
    },
    set currentTimePoint(time: blick) {
      SV.getPlayback().seek(
        SV.getProject()
          .getTimeAxis()
          .getSecondsFromBlick(time),
      );
    },
    get currentNoteGroupReference(): NoteGroupReferenceProxy {
      return noteGroupReferenceProxyOf(SV.getMainEditor().getCurrentGroup());
    },
    get currentTrack(): TrackProxy {
      return trackProxyOf(SV.getMainEditor().getCurrentTrack());
    },
    get playbackStatus(): PlaybackStatus {
      return SV.getPlayback().getStatus();
    },
    mainEditor: {
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
                .map(noteGroupReferenceProxyOf)
            : undefined,
          addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void {
            SV.getMainEditor()
              .getSelection()
              .selectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean {
            return SV.getMainEditor()
              .getSelection()
              .unselectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeAllGroupReferences(): boolean {
            return SV.getMainEditor()
              .getSelection()
              .clearGroups();
          },
          get notes(): readonly NoteProxy[] | undefined {
            return SV.getMainEditor()
              .getSelection()
              .hasSelectedNotes()
              ? SV.getMainEditor()
                  .getSelection()
                  .getSelectedNotes()
                  .map(noteProxyOf)
              : undefined;
          },
          set notes(notes: readonly NoteProxy[] | undefined) {
            SV.getMainEditor()
              .getSelection()
              .clearNotes();
            if (notes) {
              notes.forEach((note: NoteProxy): void =>
                SV.getMainEditor()
                  .getSelection()
                  .selectNote(note._rawNote()),
              );
            }
          },
          addNote(note: NoteProxy): void {
            SV.getMainEditor()
              .getSelection()
              .selectNote(note._rawNote());
          },
          removeNote(note: NoteProxy): boolean {
            return SV.getMainEditor()
              .getSelection()
              .unselectNote(note._rawNote());
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
          set timeLeft(timePoint: blick) {
            SV.getMainEditor()
              .getNavigation()
              .setTimeLeft(timePoint);
          },
          get timeRight(): blick {
            return SV.getMainEditor()
              .getNavigation()
              .getTimeViewRange()[1];
          },
          set timeRight(timePoint: blick) {
            SV.getMainEditor()
              .getNavigation()
              .setTimeRight(timePoint);
          },
          snap(timePoint: blick): blick {
            return SV.getMainEditor()
              .getNavigation()
              .snap(timePoint);
          },
          t2x(timePoint: blick): pixel {
            return SV.getMainEditor()
              .getNavigation()
              .t2x(timePoint);
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
      get allNoteGroups(): NoteGroupProxy[] {
        const noteGroups: NoteGroupProxy[] = [];
        for (let i = 0; i < SV.getProject().getNumNoteGroupsInLibrary(); i++) {
          const noteGroup = SV.getProject().getNoteGroup(i);
          if (!noteGroup) {
            throw new Error(`It's impossible to have undefined NoteGroup here`);
          }
          noteGroups.push(noteGroupProxyOf(noteGroup));
        }
        return noteGroups;
      },
      addNoteGroup(group: NoteGroupProxy, suggestedIndex?: number): number {
        return SV.getProject().addNoteGroup(group._rawNoteGroup(), suggestedIndex);
      },
      removeNoteGroup(noteGroup: NoteGroupProxy): void {
        SV.getProject().removeNoteGroup(noteGroup._rawNoteGroup().getIndexInParent());
      },
      findNoteGroupById(noteGroupId: string): NoteGroupProxy | undefined {
        const noteGroup = SV.getProject().getNoteGroup(noteGroupId);
        if (noteGroup) {
          return noteGroupProxyOf(noteGroup);
        }
      },
      get allTracks(): TrackProxy[] {
        const tracks: TrackProxy[] = [];
        for (let i = 0; i < SV.getProject().getNumTracks(); i++) {
          const track = SV.getProject().getTrack(i);
          tracks.push(trackProxyOf(track));
        }
        return tracks.sort((a, b): number => a.displayOrder - b.displayOrder);
      },
      addTrack(track: TrackProxy): void {
        SV.getProject().addTrack(track._rawTrack());
      },
      removeTrack(track: TrackProxy): void {
        SV.getProject().removeTrack(track._rawTrack().getIndexInParent());
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
      newNoteGroup(): NoteGroupProxyBuilder {
        return createNoteGroupProxyBuilder(SV.getProject());
      },
      newTrack(): TrackProxyBuilder {
        return createTrackProxyBuilder(SV.getProject());
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
          get noteGroupReferences(): readonly (InstrumentalReferenceProxy | NoteGroupReferenceProxy)[] | undefined {
            const arrangementView = SV.getArrangement();
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
              SV.getArrangement()
                .getSelection()
                .clearGroups();
              if (noteGroupReferences) {
                (noteGroupReferences as NoteGroupReferenceProxy[]).forEach(
                  (noteGroupReference: NoteGroupReferenceProxy): void =>
                    SV.getArrangement()
                      .getSelection()
                      .selectGroup(noteGroupReference._rawNoteGroupReference()),
                );
              }
            }
          },
          addGroupReference(noteGroupReference: NoteGroupReferenceProxy): void {
            SV.getArrangement()
              .getSelection()
              .selectGroup(noteGroupReference._rawNoteGroupReference());
          },
          removeGroupReference(noteGroupReference: NoteGroupReferenceProxy): boolean {
            return SV.getArrangement()
              .getSelection()
              .unselectGroup(noteGroupReference._rawNoteGroupReference());
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
          set timeLeft(timePoint: blick) {
            SV.getArrangement()
              .getNavigation()
              .setTimeLeft(timePoint);
          },
          get timeRight(): blick {
            return SV.getArrangement()
              .getNavigation()
              .getTimeViewRange()[1];
          },
          set timeRight(timePoint: blick) {
            SV.getArrangement()
              .getNavigation()
              .setTimeRight(timePoint);
          },
          snap(timePoint: blick): blick {
            return SV.getArrangement()
              .getNavigation()
              .snap(timePoint);
          },
          t2x(timePoint: blick): pixel {
            return SV.getArrangement()
              .getNavigation()
              .t2x(timePoint);
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
};
