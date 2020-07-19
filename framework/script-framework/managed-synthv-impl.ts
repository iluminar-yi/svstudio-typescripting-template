import { CustomDialogForm, WidgetAnswers, YesNoCancelAnswer } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import log from '../log';
import { ManagedSynthV } from '../types';

export class ManagedSynthVImpl implements ManagedSynthV {
  public readonly QUARTER: 705600000;
  private readonly onFinish: () => void;
  private readonly callbacks: Function[];
  private finished: boolean = false;

  public constructor(onFinish: () => void) {
    this.QUARTER = SV.QUARTER;
    this.onFinish = onFinish;
    this.callbacks = [];
  }

  public start = (): void => {
    setInterval((): void => {
      if (!this.callbacks.length) {
        SV.showMessageBoxAsync('Finishing', 'finishing');
        this.finishUp();
      }
    }, 20);
  };

  private finishUp = (): void => {
    this.finished = true;
    this.callbacks.splice(0, this.callbacks.length);
    this.onFinish();
  };

  private removeCallback = (callback: Function): void => {
    const index = this.callbacks.indexOf(callback);
    if (index < 0) {
      throw new Error('Given callback not found in stored callbacks: ' + callback);
    }
    this.callbacks.splice(index, 1);
  };

  private getManagedCallback = (callback: Function): ((...args: unknown[]) => void) => {
    return (...args: unknown[]): void => {
      if (!this.finished) {
        callback(...args);
        this.removeCallback(callback);
      }
    };
  };

  public T = SV.T;
  public blackKey = SV.blackKey;
  public blick2Quarter = SV.blick2Quarter;
  public blick2Seconds = SV.blick2Seconds;
  public blickRoundDiv = SV.blickRoundDiv;
  public blickRoundTo = SV.blickRoundTo;
  public create = SV.create;
  public finish = SV.finish;
  public freq2Pitch = SV.freq2Pitch;
  public getArrangement = SV.getArrangement;
  public getHostClipboard = SV.getHostClipboard;
  public getHostInfo = SV.getHostInfo;
  public getMainEditor = SV.getMainEditor;
  public getPhonemesForGroup = SV.getPhonemesForGroup;
  public getPlayback = SV.getPlayback;
  public getProject = SV.getProject;
  public pitch2freq = SV.pitch2freq;
  public quarter2Blick = SV.quarter2Blick;
  public seconds2Blick = SV.seconds2Blick;
  public setHostClipboard = SV.setHostClipboard;
  public showCustomDialog = SV.showCustomDialog;
  public showInputBox = SV.showInputBox;
  public showMessageBox = SV.showMessageBox;
  public showOkCancelBox = SV.showOkCancelBox;
  public showYesNoCancelBox = SV.showYesNoCancelBox;

  public setTimeout(timeout: number, callback: () => void): void {
    this.callbacks.push(callback);
    try {
      SV.setTimeout(timeout, this.getManagedCallback(callback));
    } catch (e) {
      log.error(String(e));
      this.removeCallback(callback);
    }
  }

  public showCustomDialogAsync(form: CustomDialogForm, callback: (answers: WidgetAnswers) => void): void {
    this.callbacks.push(callback);
    try {
      SV.showCustomDialogAsync(form, this.getManagedCallback(callback));
    } catch (e) {
      this.removeCallback(callback);
    }
  }

  public showInputBoxAsync(
    title: string,
    message: string,
    defaultText: string,
    callback: (answer: string) => void,
  ): void {
    this.callbacks.push(callback);
    try {
      SV.showInputBoxAsync(title, message, defaultText, this.getManagedCallback(callback));
    } catch (e) {
      this.removeCallback(callback);
    }
  }

  public showMessageBoxAsync(title: string, message: string, callback?: () => void): void {
    if (!callback) {
      SV.showMessageBoxAsync(title, message);
      return;
    }
    this.callbacks.push(callback);
    try {
      SV.showMessageBoxAsync(title, message, this.getManagedCallback(callback));
    } catch (e) {
      this.removeCallback(callback);
    }
  }

  public showOkCancelBoxAsync(title: string, message: string, callback: (answer: boolean) => void): void {
    this.callbacks.push(callback);
    try {
      SV.showOkCancelBoxAsync(title, message, this.getManagedCallback(callback));
    } catch (e) {
      this.removeCallback(callback);
    }
  }

  public showYesNoCancelBoxAsync(title: string, message: string, callback: (answer: YesNoCancelAnswer) => void): void {
    this.callbacks.push(callback);
    try {
      SV.showYesNoCancelBoxAsync(title, message, this.getManagedCallback(callback));
    } catch (e) {
      this.removeCallback(callback);
    }
  }
}
