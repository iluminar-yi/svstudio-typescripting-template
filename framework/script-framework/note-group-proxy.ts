import { Note, NoteGroup, ParameterType, Project } from 'svstudio-scripts-typing';

import { SV } from '../_global';

import { automationProxyOf } from './automation-proxy';
import { createNoteProxyBuilder, fromNoteMeta, noteProxyOf } from './note-proxy';
import {
  AutomationMeta,
  AutomationProxy,
  NoteGroupMeta,
  NoteGroupParameterMap,
  NoteGroupProxy,
  NoteGroupProxyBuilder,
  NoteGroupReferenceProxy,
  NoteProxy,
  NoteProxyBuilder,
  ProjectContext,
} from './types';

export const fromNoteGroupMeta = (noteGroupMeta: NoteGroupMeta, project: ProjectContext): NoteGroupProxy => {
  const { name, notes, pitchDelta, vibratoEnv, loudness, tension, breathiness, voicing, gender } = noteGroupMeta;

  const noteGroup = project
    .newNoteGroup()
    .setName(name)
    .setPitchDelta(pitchDelta)
    .setVibratoEnv(vibratoEnv)
    .setLoudness(loudness)
    .setTension(tension)
    .setBreathiness(breathiness)
    .setVoicing(voicing)
    .setGender(gender)
    .create();

  notes.forEach((noteMeta): void => {
    fromNoteMeta(noteMeta, noteGroup);
  });

  return noteGroup;
};

export const noteGroupProxyOf = (noteGroup: NoteGroup): NoteGroupProxy => {
  const clearNotes = (): void => {
    while (noteGroup.getNumNotes()) {
      noteGroup.removeNote(0);
    }
  };

  const overwriteParameters = (automationMeta: AutomationMeta, parameterType: ParameterType): void => {
    const automation = automationProxyOf(noteGroup.getParameter(parameterType));
    automation.removeAll();
    automationMeta.controlPoints.forEach(([timePoint, value]): void => {
      automation.add(timePoint, value);
    });
  };

  const noteGroupProxy: NoteGroupProxy = {
    get breathiness(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('Breathiness'));
    },
    set breathiness(breathiness: AutomationProxy) {
      overwriteParameters(breathiness, 'Breathiness');
    },

    get gender(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('Gender'));
    },
    set gender(gender: AutomationProxy) {
      overwriteParameters(gender, 'Gender');
    },

    get id(): string {
      return noteGroup.getUUID();
    },

    get loudness(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('Loudness'));
    },
    set loudness(loudness: AutomationProxy) {
      overwriteParameters(loudness, 'Loudness');
    },

    get name(): string {
      return noteGroup.getName();
    },
    set name(name: string) {
      noteGroup.setName(name);
    },

    get notes(): NoteProxy[] {
      const notes: Note[] = [];
      for (let i = 0; i < noteGroup.getNumNotes(); i++) {
        notes.push(noteGroup.getNote(i));
      }
      return notes.map(noteProxyOf);
    },
    set notes(notes: NoteProxy[]) {
      clearNotes();
      notes.forEach(noteGroupProxy.addNote);
    },

    get pitchDelta(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('PitchDelta'));
    },
    set pitchDelta(pitchDelta: AutomationProxy) {
      overwriteParameters(pitchDelta, 'PitchDelta');
    },

    get tension(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('Tension'));
    },
    set tension(tension: AutomationProxy) {
      overwriteParameters(tension, 'Tension');
    },

    get vibratoEnv(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('VibratoEnv'));
    },
    set vibratoEnv(vibratoEnv: AutomationProxy) {
      overwriteParameters(vibratoEnv, 'VibratoEnv');
    },

    get voicing(): AutomationProxy {
      return automationProxyOf(noteGroup.getParameter('Voicing'));
    },
    set voicing(voicing: AutomationProxy) {
      overwriteParameters(voicing, 'Voicing');
    },

    setBreathiness(breathiness: AutomationMeta): NoteGroupProxy {
      this.breathiness = breathiness as AutomationProxy;
      return this;
    },
    setGender(gender: AutomationMeta): NoteGroupProxy {
      this.gender = gender as AutomationProxy;
      return this;
    },
    setLoudness(loudness: AutomationMeta): NoteGroupProxy {
      this.loudness = loudness as AutomationProxy;
      return this;
    },
    setPitchDelta(pitchDelta: AutomationMeta): NoteGroupProxy {
      this.pitchDelta = pitchDelta as AutomationProxy;
      return this;
    },
    setTension(tension: AutomationMeta): NoteGroupProxy {
      this.tension = tension as AutomationProxy;
      return this;
    },
    setVibratoEnv(vibratoEnv: AutomationMeta): NoteGroupProxy {
      this.vibratoEnv = vibratoEnv as AutomationProxy;
      return this;
    },
    setVoicing(voicing: AutomationMeta): NoteGroupProxy {
      this.voicing = voicing as AutomationProxy;
      return this;
    },

    _rawNoteGroup: (): NoteGroup => {
      return noteGroup;
    },

    addNote(note: NoteProxy): number {
      return noteGroup.addNote(note._rawNote());
    },

    assignTo: (noteGroupReference: NoteGroupReferenceProxy): NoteGroupProxy => {
      noteGroupReference.setTarget(noteGroupProxy);
      return noteGroupProxy;
    },

    removeNote(note: NoteProxy): void {
      const rawNotes = noteGroupProxy.notes.map((n): Note => n._rawNote());
      if (!rawNotes.find((n): boolean => n === note._rawNote())) {
        throw new Error('Given note not found!');
      }
      noteGroup.removeNote(rawNotes.indexOf(note._rawNote()));
    },

    newNote: (): NoteProxyBuilder => createNoteProxyBuilder(noteGroupProxy),
  };

  return noteGroupProxy;
};

export const createNoteGroupProxyBuilder = (project: Project): NoteGroupProxyBuilder => {
  const noteGroup = SV.create('NoteGroup');
  const noteGroupProxy = noteGroupProxyOf(noteGroup);

  const builder: NoteGroupProxyBuilder = {
    addNote(note: NoteProxy): NoteGroupProxyBuilder {
      noteGroup.addNote(note._rawNote());
      return builder;
    },
    assignTo(noteGroupReference: NoteGroupReferenceProxy): NoteGroupProxyBuilder {
      noteGroupReference.setTarget(noteGroupProxy);
      return builder;
    },
    removeNote(note: NoteProxy): NoteGroupProxyBuilder {
      noteGroupProxy.removeNote(note);
      return builder;
    },
    setBreathiness(breathiness: NoteGroupParameterMap['breathiness']): NoteGroupProxyBuilder {
      noteGroupProxy.setBreathiness(breathiness);
      return builder;
    },
    setGender(gender: NoteGroupParameterMap['gender']): NoteGroupProxyBuilder {
      noteGroupProxy.setGender(gender);
      return builder;
    },
    setLoudness(loudness: NoteGroupParameterMap['loudness']): NoteGroupProxyBuilder {
      noteGroupProxy.setLoudness(loudness);
      return builder;
    },
    setName(name: string): NoteGroupProxyBuilder {
      noteGroup.setName(name);
      return builder;
    },
    setPitchDelta(pitchDelta: NoteGroupParameterMap['pitchDelta']): NoteGroupProxyBuilder {
      noteGroupProxy.setPitchDelta(pitchDelta);
      return builder;
    },
    setTension(tension: NoteGroupParameterMap['tension']): NoteGroupProxyBuilder {
      noteGroupProxy.setTension(tension);
      return builder;
    },
    setVibratoEnv(vibratoEnv: NoteGroupParameterMap['vibratoEnv']): NoteGroupProxyBuilder {
      noteGroupProxy.setVibratoEnv(vibratoEnv);
      return builder;
    },
    setVoicing(voicing: NoteGroupParameterMap['voicing']): NoteGroupProxyBuilder {
      noteGroupProxy.setVoicing(voicing);
      return builder;
    },
    create(): NoteGroupProxy {
      project.addNoteGroup(noteGroup);
      return noteGroupProxy;
    },
  };

  return builder;
};
