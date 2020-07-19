import { SynthV } from 'svstudio-scripts-typing';

import { Logger } from './types';

export class SvLogger implements Logger {
  private readonly sv: SynthV;

  public constructor(sv: SynthV) {
    this.sv = sv;
  }

  private log = (title: string, message: string, ...args: unknown[]): void => {
    try {
      this.sv.showMessageBoxAsync(title, `${message}${args.length ? `:\n${JSON.stringify(args, null, 2)}` : ''}`);
    } catch (e) {
      // There is nothing else we can do. Just ignore.
    }
  };

  public debug = (message: string, ...args: unknown[]): void => {
    this.log('DEBUG', message, ...args);
  };

  public error = (message: string, ...args: unknown[]): void => {
    this.log('ERROR', message, ...args);
  };

  public info = (message: string, ...args: unknown[]): void => {
    this.log('INFO', message, ...args);
  };

  public warning = (message: string, ...args: unknown[]): void => {
    this.log('WARNING', message, ...args);
  };
}
