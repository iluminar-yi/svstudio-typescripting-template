import { CustomDialogForm, WidgetAnswers, YesNoCancelAnswer } from 'svstudio-scripts-typing';

import { SV } from '../_global';
import log from '../log';
import { setTimeout } from '../shim/shims';
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

  public T = SV.T.bind(SV);
  public blackKey = SV.blackKey.bind(SV);
  public blick2Quarter = SV.blick2Quarter.bind(SV);
  public blick2Seconds = SV.blick2Seconds.bind(SV);
  public blickRoundDiv = SV.blickRoundDiv.bind(SV);
  public blickRoundTo = SV.blickRoundTo.bind(SV);
  public create = SV.create.bind(SV);
  public finish = SV.finish.bind(SV);
  public freq2Pitch = SV.freq2Pitch.bind(SV);
  public getArrangement = SV.getArrangement.bind(SV);
  public getHostClipboard = SV.getHostClipboard.bind(SV);
  public getHostInfo = SV.getHostInfo.bind(SV);
  public getMainEditor = SV.getMainEditor.bind(SV);
  public getPhonemesForGroup = SV.getPhonemesForGroup.bind(SV);
  public getPlayback = SV.getPlayback.bind(SV);
  public getProject = SV.getProject.bind(SV);
  public pitch2Freq = SV.pitch2Freq.bind(SV);
  public quarter2Blick = SV.quarter2Blick.bind(SV);
  public seconds2Blick = SV.seconds2Blick.bind(SV);
  public setHostClipboard = SV.setHostClipboard.bind(SV);

  public setTimeout = (timeout: number, callback: Function, ...args: unknown[]): void => {
    const callbackId = this.lifeCycleManager.reserveNewCallback();
    try {
      setTimeout(
        this.lifeCycleManager.getManagedCallback((): void => {
          callback(...args);
        }, callbackId),
        timeout,
      );
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

  public setInterval = (handler: Function, timeout?: number, ...args: unknown[]): string => {
    const id = this.lifeCycleManager.reserveNewCallback();
    const repeatedHandler = (): void => {
      if (this.lifeCycleManager.isCallbackReserved(id)) {
        handler(...args);
        setTimeout(repeatedHandler, timeout);
      }
    };
    setTimeout(repeatedHandler, timeout);
    return id;
  };

  public clearInterval = (id: string): void => {
    this.lifeCycleManager.releaseCallback(id);
  };
}
