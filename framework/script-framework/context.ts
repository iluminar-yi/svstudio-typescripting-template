import { HostInfo, LanguageCode, MeasureMark, PlaybackStatus, TempoMark } from 'svstudio-scripts-typing';

import { ManagedSynthV, blick, measure, pixel, pixelPerBlick, pixelPerSemitone, second, semitone } from '../types';

import { NoteGroupProxyImpl } from './note-group-proxy';
import { NoteGroupReferenceProxyImpl } from './note-group-reference-proxy';
import { NoteProxyImpl } from './note-proxy';
import { TrackProxyImpl } from './track-proxy';
import {
  ArrangementViewDisplay,
  ArrangementViewUserSelection,
  Context,
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
      get currentGroupReference(): NoteGroupReferenceProxy {
        return NoteGroupReferenceProxyImpl.of(mainEditor.getCurrentGroup());
      },
      get currentTrack(): TrackProxy {
        return TrackProxyImpl.of(mainEditor.getCurrentTrack());
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
            ? mainEditor
                .getSelection()
                .getSelectedGroups()
                .map(NoteGroupReferenceProxyImpl.of)
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
          notes: SV.getMainEditor()
            .getSelection()
            .hasSelectedNotes()
            ? mainEditor
                .getSelection()
                .getSelectedNotes()
                .map(NoteProxyImpl.of)
            : undefined,
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
      get allNoteGroups(): NoteGroupProxy[] {
        const noteGroups: NoteGroupProxy[] = [];
        for (let i = 0; i < project.getNumNoteGroupsInLibrary(); i++) {
          const noteGroup = project.getNoteGroup(i);
          if (!noteGroup) {
            throw new Error(`It's impossible to have undefined NoteGroup here`);
          }
          noteGroups.push(NoteGroupProxyImpl.of(noteGroup));
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
          return NoteGroupProxyImpl.of(noteGroup);
        }
      },
      get allTracks(): TrackProxy[] {
        const tracks: TrackProxy[] = [];
        for (let i = 0; i < project.getNumTracks(); i++) {
          const track = project.getTrack(i);
          tracks.push(TrackProxyImpl.of(track));
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
      newNoteGroup(): NoteGroupProxyBuilder {
        const noteGroup = SV.create('NoteGroup');
        const noteGroupProxy = NoteGroupProxyImpl.of(noteGroup);
        return {
          addNote(note: NoteProxy): NoteGroupProxyBuilder {
            noteGroup.addNote(note._rawNote());
            return this;
          },
          assignTo(noteGroupReference: NoteGroupReferenceProxy): NoteGroupProxyBuilder {
            noteGroupReference.setTarget(noteGroupProxy);
            return this;
          },
          removeNote(note: NoteProxy): NoteGroupProxyBuilder {
            noteGroupProxy.removeNote(note);
            return this;
          },
          setName(name: string): NoteGroupProxyBuilder {
            noteGroup.setName(name);
            return this;
          },
          create(): NoteGroupProxy {
            project.addNoteGroup(noteGroup);
            return noteGroupProxy;
          },
        };
      },
      newTrack(): TrackProxyBuilder {
        const track = SV.create('Track');
        const trackProxy = TrackProxyImpl.of(track);
        return {
          addNoteGroupReferences(...noteGroupReferences: NoteGroupReferenceProxy[]): TrackProxyBuilder {
            trackProxy.addNoteGroupReferences(...noteGroupReferences);
            return this;
          },
          setBounced(bounced: boolean): TrackProxyBuilder {
            track.setBounced(bounced);
            return this;
          },
          setDisplayColor(color: string): TrackProxyBuilder {
            track.setDisplayColor(color);
            return this;
          },
          setName(name: string): TrackProxyBuilder {
            track.setName(name);
            return this;
          },
          create(): TrackProxy {
            project.addTrack(track);
            return trackProxy;
          },
        };
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
            ? arrangementView
                .getSelection()
                .getSelectedGroups()
                .map(NoteGroupReferenceProxyImpl.of)
            : undefined,
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
