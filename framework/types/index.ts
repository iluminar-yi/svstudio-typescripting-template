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

import { Logger } from '../log/types';
import { Context, SvSystem, Utils } from '../script-framework/types';

/**
 * A (simplified) typing of the overall `global` scope.
 */
export interface Global {
  SV: SynthV;
  [k1: string]: unknown;
}

/**
 * A unit of musical time defined in Synthesizer V.
 *
 * @see https://dreamtonics.com/synthv/scripting/SV.html#QUARTER
 */
export type blick = number;

/**
 * A unit for musical measures.
 */
export type measure = number;

/**
 * A unit of change of musical tone.
 */
export type semitone = number;

/**
 * A unit of time.
 */
export type second = number;

/**
 * A unit of display size.
 */
export type pixel = number;

/**
 * The ratio of display size to unit (musical) time.
 */
export type pixelPerBlick = number;

/**
 * The ration of display size to unit change of musical tone.
 */
export type pixelPerSemitone = number;

/**
 * A unit of frequency.
 */
export type Hz = number;

/**
 * The functions that Synthesizer V requires the scripts to provide.
 * Script authors don't need to use it directly.
 * Instead, implement {@link SvScriptFactory}.
 *
 * @see https://dreamtonics.com/synthv/scripting/tutorial-A%20Minimal%20Example.html
 */
export interface SvScript {
  getClientInfo(): ClientInfo;
  main: ((env: FrameworkEnvironment) => void) | ((env: FrameworkEnvironment) => Promise<void>);
  getTranslations?(langCode: LanguageCode): Translation[];
}

/**
 * A decorated (almost) instance of {@link SynthV} where the any callback-taking APIs are decorated
 * to register the callback with {@link LifeCycleManager}.
 * If a method has both a synchronous version and an asynchronous version, the synchronous version
 * is overwritten to return a Promise, making it asynchronous.
 * For documentation purposes, many documentations here are directly taken from the {@link SynthV} documentation.
 *
 * @see https://dreamtonics.com/synthv/scripting/SV.html
 * @internal
 */
export interface ManagedSynthV {
  /**
   * Number of blicks in a quarter. The value is 705600000.
   * @remarks
   * We denote <em>musical time</em> (e.g. a quarter, a beat) differently from <em>physical time</em> (e.g. one second).
   * A blick is the smallest unit of <em>musical time</em> that the GUI works with internally.
   * It is a large number chosen to be divisible by a lot of similarly purposed numbers used in music software.
   * The name originates from [Flicks](https://github.com/facebookarchive/Flicks).
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#QUARTER
   */
  QUARTER: number;

  /**
   * Check whether the key (passed in as a MIDI number) is a black key on a piano.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#blackKey
   * @param k - MIDI number representing a key.
   */
  blackKey(k: number): boolean;

  /**
   * Convert b from number of blicks into number of quarters.
   * <br>
   * Equivalent to b / SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#blick2Quarter
   * @param b - A timespan value in blicks.
   */
  blick2Quarter(b: number): number;

  /**
   * Convert b from blicks into seconds with the specified beats per minute bpm.
   * <br>
   * Equivalent to b / SV.QUARTER * 60 / bpm.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#blick2Seconds
   * @param b - A timespan value in blicks.
   * @param bpm - Speed of music, in beats per minute.
   */
  blick2Seconds(b: number, bpm: number): number;

  /**
   * Rounded division of dividend (blicks) over divisor (blicks).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#blickRoundDiv
   * @param dividend - Dividend. The "a" as in `a / b`.
   * @param divisor - Divisor. The "b" as in `a / b`.
   */
  blickRoundDiv(dividend: number, divisor: number): number;

  /**
   * Returns the closest multiple of interval (blicks) from b (blick).
   * <br>
   * Equivalent to `blickRoundDiv(b, interval) * interval`.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#blickRoundTo
   * @param b - A timespan value in blicks.
   * @param interval - Number of intervals to multiply by.
   */
  blickRoundTo(b: number, interval: number): number;

  /**
   * Create a new Note.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'Note'): Note;
  /**
   * Create a new Automation.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'Automation'): Automation;
  /**
   * Create a new NoteGroup.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'NoteGroup'): NoteGroup;
  /**
   * Create a new NoteGroupReference.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'NoteGroupReference'): NoteGroupReference;
  /**
   * Create a new `TrackMixer`. Currently undocumented.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'TrackMixer'): {};
  /**
   * Create a new Track.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'Track'): Track;
  /**
   * Create a new TimeAxis.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'TimeAxis'): TimeAxis;
  /**
   * Create a new Project.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#create
   * @param type - A type-specifying string.
   */
  create(type: 'Project'): Project;

  /**
   * Indicate to the framework that execution has started.
   * This should not need to be called by user script.
   */
  start(): void;

  /**
   * Mark the finish of a script.
   * All subsequent async callbacks will not be executed.
   * Note that this does not cause the current script to exit immediately.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#finish
   */
  finish(): void;

  /**
   * Convert a frequency in Hz to a MIDI number (semitones, where C4 is 60).
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#freq2Pitch
   * @param f - Frequency in Hz.
   */
  freq2Pitch(f: number): number;

  /**
   * Get the UI state object for arrangement view.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getArrangement
   */
  getArrangement(): ArrangementView;

  /**
   * Get the text on the system clipboard.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getHostClipboard
   */
  getHostClipboard(): string;

  /**
   * Get {@link HostInfo}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getHostInfo
   */
  getHostInfo(): HostInfo;

  /**
   * Get the UI state object for the piano roll.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getMainEditor
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
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getPhonemesForGroup
   * @param group - A `NoteGroupReference` to get phonemes for.
   */
  getPhonemesForGroup(group: NoteGroupReference): string[];

  /**
   * Get the UI state object for controlling the playback.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getPlayback
   */
  getPlayback(): PlaybackControl;

  /**
   * Get the currently open project.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#getProject
   */
  getProject(): Project;

  /**
   * Convert a MIDI number (semitones, where C4 is 60) to a frequency in Hz.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#pitch2Freq
   * @param p - Pitch in MIDI number.
   */
  pitch2Freq(p: number): number;

  /**
   * Convert q from number of quarters into number of blick.
   * <br>
   * Equivalent to q * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#quarter2Blick
   * @param q - Number of quarters.
   */
  quarter2Blick(q: number): number;

  /**
   * Convert s from seconds into blicks with the specified beats per minute bpm.
   * <br>
   * Equivalent to s / 60 * bpm * SV.QUARTER.
   * <br>
   * Conversions between musical and physical time in the context of a project are done by {@link TimeAxis}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#seconds2Blick
   * @param s - Time in seconds.
   * @param bpm - Speed of music, in beats per minute.
   */
  seconds2Blick(s: number, bpm: number): number;

  /**
   * Set the system clipboard.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#setHostClipboard
   * @param text - Text to be set as clipboard content.
   */
  setHostClipboard(text: string): void;

  /**
   * Schedule a delayed call to callback after timeOut milliseconds.
   * <br>
   * After calling setTimeout, the script will continue instead of immediately executing callback.
   * The callback function is pushed onto a queue and delayed.
   * This is not a preemptive callback, i.e. the execution of callback will not interrupt the currently running task.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#setTimeout
   * @param timeout - Number of seconds at least, before running the callback
   * @param callback - Callback to run
   */
  setTimeout(timeout: number, callback: () => void): void;

  /**
   * The promise version of {@link SV#showCustomDialogAsync}.
   * It returns the inputs (the completed form) from the user.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showCustomDialogAsync
   * @param form - Form options to create the dialog from.
   */
  showCustomDialog(form: CustomDialogForm): Promise<WidgetAnswers>;

  /**
   * Display a custom dialog defined in form, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one argument which contains the results.
   * <br>
   * See [Custom Dialogs](https://dreamtonics.com/synthv/scripting/tutorial-Custom%20Dialogs.html) for more information.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showCustomDialogAsync
   * @param form - Form options to create the dialog from.
   * @param callback - Callback to run on the user response
   */
  showCustomDialogAsync(form: CustomDialogForm, callback: (answers: WidgetAnswers) => void): void;

  /**
   * The promise version of {@link SV#showInputBoxAsync}.
   * It returns the text input from the user.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showInputBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   * @param defaultText - Default value if the user does not enter text.
   */
  showInputBox(title: string, message: string, defaultText: string): Promise<string>;

  /**
   * Display a dialog with a text box and an "OK" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the dialog is closed.
   * The callback function takes one string argument that is the content of the text box.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showInputBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   * @param defaultText - Default value if the user does not enter text.
   * @param callback - Callback to run on the user response
   */
  showInputBoxAsync(title: string, message: string, defaultText: string, callback: (answer: string) => void): void;

  /**
   * The promise version of {@link SV#showMessageBoxAsync}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showMessageBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   */
  showMessageBox(title: string, message: string): Promise<void>;

  /**
   * Cause a message box to pop up without blocking the script execution.
   * <br>
   * If a callback is given, it is invoked once the message box is closed. The callback function takes no argument.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showMessageBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   * @param callback - Callback to run on the user response
   */
  showMessageBoxAsync(title: string, message: string, callback?: () => void): void;

  /**
   * The promise version of {@link SV#showOkCancelBoxAsync}.
   * It returns true if "OK" button is pressed.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showOkCancelBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   */
  showOkCancelBox(title: string, message: string): Promise<boolean>;

  /**
   * Display a message box with an "OK" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed.
   * The callback function takes one boolean argument that is true if "OK" button is pressed.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showOkCancelBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   * @param callback - Callback to run on the user response
   */
  showOkCancelBoxAsync(title: string, message: string, callback: (answer: boolean) => void): void;

  /**
   * The promise version of {@link SV#showYesNoCancelBoxAsync}.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showYesNoCancelBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   */
  showYesNoCancelBox(title: string, message: string): Promise<YesNoCancelAnswer>;

  /**
   * Display a message box with a "Yes" button, an "No" button and a "Cancel" button, without blocking the script execution.
   * <br>
   * callback will be invoked once the message box is closed. The callback function takes one string argument that can be "yes", "no" or "cancel".
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#showYesNoCancelBoxAsync
   * @param title - Title of the input box.
   * @param message - Body of the question prompt.
   * @param callback - Callback to run on the user response
   */
  showYesNoCancelBoxAsync(title: string, message: string, callback: (answer: YesNoCancelAnswer) => void): void;

  /**
   * Get a localized version of text based on the current UI language settings.
   * <br>
   * See [Localization](https://dreamtonics.com/synthv/scripting/tutorial-Localization.html) for more information.
   *
   * @see https://dreamtonics.com/synthv/scripting/SV.html#T
   * @param text - Input text that needs translated.
   */
  T(text: string): string;

  /**
   * Runs a handler repeatedly, at the specified interval.
   *
   * @param handler - handler to run
   * @param timeout - length of interval in-between runs, in milliseconds
   * @param args - arguments to handler
   * @returns id of this interval, can be used with {@link ManagedSynthV#clearInterval}
   */
  setInterval(handler: Function, timeout?: number, ...args: unknown[]): string;

  /**
   * Cancels firing of an interval.
   *
   * @param id - interval id
   */
  clearInterval(id: string): void;
}

/**
 * The interface of the object injected into {@link SvScriptFactory}.
 *
 * @remarks
 * `SV` and `_SV` are included because the immaturity of the framework might lead to not having an essential functionalities.
 * However, as the framework matures, these might be removed from the environment.
 */
export interface FrameworkEnvironment {
  SV: ManagedSynthV;
  _SV: SynthV;
  log: Logger;
  context: Context;
  svSystem: SvSystem;
  utils: Utils;
}

export interface StartUpEnvironment {
  context: Pick<Context, 'osType' | 'osName' | 'hostName' | 'hostVersion' | 'hostVersionNumber' | 'languageCode'>;
  svSystem: Pick<
    SvSystem,
    | 'setTimeout'
    | 'setImmediate'
    | 'setInterval'
    | 'showCustomDialog'
    | 'showInputBox'
    | 'showMessageBox'
    | 'showOkCancelBox'
    | 'showYesNoCancelBox'
  >;
}

/**
 * The factory method signature. Please implement this in the script code.
 */
export type SvScriptFactory = (env: StartUpEnvironment) => SvScript;
