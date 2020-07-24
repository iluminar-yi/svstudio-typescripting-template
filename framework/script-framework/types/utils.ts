import { blick, measure, second } from '../../types';

export interface Utils {
  blackKey(k: number): boolean;
  blick2Quarter(b: number): number;
  blick2Seconds(b: number, bpm: number): number;
  blickRoundDiv(dividend: number, divisor: number): number;
  blickRoundTo(b: number, interval: number): number;
  freq2Pitch(f: number): number;
  pitch2Freq(p: number): number;
  quarter2Blick(q: number): number;
  seconds2Blick(s: number, bpm: number): number;
  getTimePointInSeconds(timePointInBlick: blick): second;
  getTimePointInBlicks(timePointInSeconds: second): blick;
  getMeasureAtTimePoint(timePoint: blick): measure;
}
