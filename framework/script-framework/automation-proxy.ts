import { Automation, Definition, InterpolationMethod, ParameterType } from 'svstudio-scripts-typing';

import { blick } from '../types';

import { AutomationProxy } from './types';

export const automationProxyOf = (automation: Automation): AutomationProxy => {
  return {
    get definition(): Definition {
      return automation.getDefinition();
    },
    get interpolationMethod(): InterpolationMethod {
      return automation.getInterpolationMethod();
    },
    get type(): ParameterType {
      return automation.getType();
    },
    get controlPoints(): [blick, number][] {
      return automation.getAllPoints();
    },
    add(timePoint: blick, value: number): boolean {
      return automation.add(timePoint, value);
    },
    getInterpolatedValueAt(timePoint: blick): number {
      return automation.get(timePoint);
    },
    getLinearInterpolatedValuAt(timePoint: blick): number {
      return automation.getLinear(timePoint);
    },
    getPointsInRange(begin: blick, end: blick): [blick, number][] {
      return automation.getPoints(begin, end);
    },
    removeAll(): void {
      automation.removeAll();
    },
    removeAt(timePoint: blick): boolean {
      return automation.remove(timePoint);
    },
    removeInRange(begin: blick, end: blick): boolean {
      return automation.remove(begin, end);
    },
  };
};
