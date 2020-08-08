import { Definition, ParameterType } from 'svstudio-scripts-typing';

import { blick } from '../../types';

export interface AutomationMeta {
  controlPoints: [blick, number][];
}

export interface AutomationProxy extends AutomationMeta {
  add(timePoint: blick, value: number): boolean;
  getInterpolatedValueAt(timePoint: blick): number;
  readonly controlPoints: [blick, number][];
  readonly definition: Definition;
  readonly interpolationMethod: string;
  getLinearInterpolatedValuAt(timePoint: blick): number;
  getPointsInRange(begin: blick, end: blick): [blick, number][];
  readonly type: ParameterType;
  removeAt(timePoint: blick): boolean;
  removeInRange(begin: blick, end: blick): boolean;
  removeAll(): void;
}
