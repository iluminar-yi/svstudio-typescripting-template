import {
  ArrangementView,
  Automation,
  ClientInfo,
  CustomDialogForm,
  HostInfo,
  LanguageCode,
  MainEditorView,
  Note,
  NoteGroup,
  NoteGroupReference,
  PlaybackControl,
  Project,
  SynthV,
  TimeAxis,
  Track,
  Translation,
  WidgetAnswers,
  YesNoCancelAnswer,
} from 'svstudio-scripts-typing';

import { Logger } from './log/types';

export interface Global {
  SV: SynthV;
  [k1: string]: unknown;
}

export interface SVScript {
  getClientInfo(): ClientInfo;
  main(): void | Promise<void>;
  getTranslations?(langCode: LanguageCode): Translation[];
}

export interface ManagedSynthV {
  /**
   * Number of blicks in a quarter. The value is 705600000.
   * <br>
   * We denote <em>musical time</em> (e.g. a quarter, a beat) differently from <em>physical time</em> (e.g. one second).
   * A blick is the smallest unit of <em>musical time</em> that the GUI works with internally.
   * It is a large number chosen to be divisible by a lot of similarly purposed numbers used in music software.
   * The name originates from <a href="https://github.com/facebookarchive/Flicks">Flicks</a>.
   */
  QUARTER: 705600000;

  /**
   * Check whether the key (passed in as a MIDI number) is a black key on a piano.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param k
   */
  blackKey(k: number): boolean;

  /**
   * Convert b from number of blicks into number of quarters.
   * <br>
   * Equivalent to b / SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   */
  blick2Quarter(b: number): number;

  /**
   * Convert b from blicks into seconds with the specified beats per minute bpm.
   * <br>
   * Equivalent to b / SV.QUARTER * 60 / bpm.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   * @param bpm
   */
  blick2Seconds(b: number, bpm: number): number;

  /**
   * Rounded division of dividend (blicks) over divisor (blicks).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param dividend
   * @param divisor
   */
  blickRoundDiv(dividend: number, divisor: number): number;

  /**
   * Returns the closest multiple of interval (blicks) from b (blick).
   * <br>
   * Equivalent to blickRoundDiv(b, interval) * interval.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param b
   * @param interval
   */
  blickRoundTo(b: number, interval: number): number;

  /**
   * Create a new object. type can be one of the following type-specifying strings.
   * @param type A type-specifying string.
   */
  create(type: 'Note'): Note;
  create(type: 'Automation'): Automation;
  create(type: 'NoteGroup'): NoteGroup;
  create(type: 'NoteGroupReference'): NoteGroupReference;
  create(type: 'TrackMixer'): {};
  create(type: 'Track'): Track;
  create(type: 'TimeAxis'): TimeAxis;
  create(type: 'Project'): Project;

  /**
   * Mark the finish of a script.
   * All subsequent async callbacks will not be executed.
   * Note that this does not cause the current script to exit immediately.
   */
  finish(): void;

  /**
   * Convert a frequency in Hz to a MIDI number (semitones, where C4 is 60).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param f
   */
  freq2Pitch(f: number): number;

  /**
   * Get the UI state object for arrangement view.
   */
  getArrangement(): ArrangementView;

  /**
   * Get the text on the system clipboard.
   */
  getHostClipboard(): string;

  /**
   * Get {@link HostInfo}.
   */
  getHostInfo(): HostInfo;

  /**
   * Get the UI state object for the piano roll.
   */
  getMainEditor(): MainEditorView;

  /**
   * Get the phonemes for all notes in a group (passed in as a group reference).
   * The group must be part of the currently open project.
   * <br>
   * Note that getPhonemesForGroup returns the output of Synthesizer V Studio's internal text-to-phoneme converter.
   * That means even for notes with no user-specified phonemes, getPhonemesForGroup will return the default pronunciation,
   * whereas {@link Note#getPhonemes} will return an empty string.
   * <br>
   * Also note that the text-to-phoneme converter runs on a different thread.
   * getPhonemesForGroup does not block the current thread.
   * There's a slight chance of returning an empty array if text-to-phoneme conversion has not yet finished on the group.
   * We recommend script authors to wrap getPhonemesForGroup in a {@link SV#setTimeout} call in such cases.
   * @param group
   */
  getPhonemesForGroup(group: NoteGroupReference): string[];

  /**
   * Get the UI state object for controlling the playback.
   */
  getPlayback(): PlaybackControl;

  /**
   * Get the currently open project.
   */
  getProject(): Project;

  /**
   * Convert a MIDI number (semitones, where C4 is 60) to a frequency in Hz.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param p
   */
  pitch2freq(p: number): number;

  /**
   * Convert q from number of quarters into number of blick.
   * <br>
   * Equivalent to q * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param q
   */
  quarter2Blick(q: number): number;

  /**
   * Convert s from seconds into blicks with the specified beats per minute bpm.
   * <br>
   * Equivalent to s / 60 * bpm * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   * @param s
   * @param bpm
   */
  seconds2Blick(s: number, bpm: number): number;

  /**
   * Set the system clipboard.
   * @param text
   */
  setHostClipboard(text: string): void;

  /**
   * Schedule a delayed call to callback after timeOut milliseconds.
   * <br>
   * After calling setTimeout, the script will continue instead of immediately executing callback.
   * The callback function is pushed onto a queue and delayed.
   * This is not a preemptive callback, i.e. the execution of callback will not interrupt the currently running task.
   * @param timeout
   * @param callback
   */
  setTimeout(timeout: number, callback: () => void): void;

  /**
   * The promise version of {@link SV#showCustomDialogAsync} that blocks the script execution until the user closes the dialog.
   * It returns the inputs (the completed form) from the user.
   * @param form
   */
  showCustomDialog(form: CustomDialogForm): Promise<WidgetAnswers>;

  /**
   * Display a custom dialog defined in form, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one argument which contains the results.
   * <br>
   * See <a href="https://dreamtonics.com/synthv/scripting/tutorial-Custom%20Dialogs.html">Custom Dialogs</a> for more information.
   * @param form
   * @param callback
   */
  showCustomDialogAsync(form: CustomDialogForm, callback: (answers: WidgetAnswers) => void): void;

  /**
   * The promise version of {@link SV#showInputBoxAsync} that blocks the script execution until the user closes the dialog.
   * It returns the text input from the user.
   * @param title
   * @param message
   * @param defaultText
   */
  showInputBox(title: string, message: string, defaultText: string): Promise<string>;

  /**
   * Display a dialog with a text box and an "OK" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one string argument that is the content of the text box.
   * @param title
   * @param message
   * @param defaultText
   * @param callback
   */
  showInputBoxAsync(title: string, message: string, defaultText: string, callback: (answer: string) => void): void;

  /**
   * The promise version of {@link SV#showMessageBoxAsync} that blocks the script execution until the user closes the message box.
   * @param title
   * @param message
   */
  showMessageBox(title: string, message: string): Promise<void>;

  /**
   * Cause a message box to pop up without blocking the script execution.
   * <br>
   * If a callback is given, it is invoked once the message box is closed. The callback function takes no argument.
   * @param title
   * @param message
   * @param callback
   */
  showMessageBoxAsync(title: string, message: string, callback?: () => void): void;

  /**
   * The promise version of {@link SV#showOkCancelBoxAsync} that blocks the script execution until the user closes the message box.
   * It returns true if "OK" button is pressed.
   * @param title
   * @param message
   */
  showOkCancelBox(title: string, message: string): Promise<boolean>;

  /**
   * Display a message box with an "OK" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed.
   * The callback function takes one boolean argument that is true if "OK" button is pressed.
   * @param title
   * @param message
   * @param callback
   */
  showOkCancelBoxAsync(title: string, message: string, callback: (answer: boolean) => void): void;

  /**
   * The promise version of {@link SV#showYesNoCancelBoxAsync} that blocks the script execution until the user closes the message box.
   * @param title
   * @param message
   */
  showYesNoCancelBox(title: string, message: string): Promise<YesNoCancelAnswer>;

  /**
   * Display a message box with a "Yes" button, an "No" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed. The callback function takes one string argument that can be "yes", "no" or "cancel".
   * @param title
   * @param message
   * @param callback
   */
  showYesNoCancelBoxAsync(title: string, message: string, callback: (answer: YesNoCancelAnswer) => void): void;

  /**
   * Get a localized version of text based on the current UI language settings.
   * <br>
   * See <a href="https://dreamtonics.com/synthv/scripting/tutorial-Localization.html">Localization</a> for more information.
   * @param text
   * @constructor
   */
  T(text: string): string;
}

export interface FrameworkEnvironment {
  SV: ManagedSynthV;
  _SV: SynthV;
  log: Logger;
}

export type SVScriptFactory = (env: FrameworkEnvironment) => SVScript;
