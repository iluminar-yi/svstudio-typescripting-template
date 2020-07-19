import { CustomDialogForm, WidgetAnswers, YesNoCancelAnswer } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import log from '../log';
import { ManagedSynthV } from '../types';

import { LifeCycleManager } from './types';

export class ManagedSynthVImpl implements ManagedSynthV {
  public readonly QUARTER: 705600000 = SV.QUARTER;
  public readonly lifeCycleManager: LifeCycleManager;

  public constructor(lifeCycleManager: LifeCycleManager) {
    this.lifeCycleManager = lifeCycleManager;
  }

  public start = (): void => {
    this.lifeCycleManager.start();
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

  public setTimeout = (timeout: number, callback: () => void): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.setTimeout(timeout, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showCustomDialogAsync = (form: CustomDialogForm, callback: (answers: WidgetAnswers) => void): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.showCustomDialogAsync(form, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showInputBoxAsync = (
    title: string,
    message: string,
    defaultText: string,
    callback: (answer: string) => void,
  ): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.showInputBoxAsync(title, message, defaultText, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showMessageBoxAsync = (title: string, message: string, callback?: () => void): void => {
    if (!callback) {
      SV.showMessageBoxAsync(title, message);
      return;
    }
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.showMessageBoxAsync(title, message, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showOkCancelBoxAsync = (title: string, message: string, callback: (answer: boolean) => void): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.showOkCancelBoxAsync(title, message, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showYesNoCancelBoxAsync = (
    title: string,
    message: string,
    callback: (answer: YesNoCancelAnswer) => void,
  ): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      SV.showYesNoCancelBoxAsync(title, message, this.lifeCycleManager.getManagedCallback(callback, callbackId));
    } catch (e) {
      log.error('Error encountered', e);
      this.lifeCycleManager.releaseCallback(callbackId);
    }
  };

  public showCustomDialog = async (form: CustomDialogForm): Promise<WidgetAnswers> => {
    return new Promise((resolve): void => {
      this.showCustomDialogAsync(form, resolve);
    });
  };

  public showInputBox = async (title: string, message: string, defaultText: string): Promise<string> => {
    return new Promise((resolve): void => {
      this.showInputBoxAsync(title, message, defaultText, resolve);
    });
  };

  public showMessageBox = async (title: string, message: string): Promise<void> => {
    return new Promise((resolve): void => {
      this.showMessageBoxAsync(title, message, resolve);
    });
  };

  public showOkCancelBox = async (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve): void => {
      this.showOkCancelBoxAsync(title, message, resolve);
    });
  };

  public showYesNoCancelBox = async (title: string, message: string): Promise<YesNoCancelAnswer> => {
    return new Promise((resolve): void => {
      this.showYesNoCancelBoxAsync(title, message, resolve);
    });
  };
}
