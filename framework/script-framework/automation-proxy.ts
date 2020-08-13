import { Automation, Definition, InterpolationMethod, ParameterType } from 'svstudio-scripts-typing';

import { blick } from '../types';

import { AutomationProxy } from './types';

export const automationProxyOf = (automation: Automation): AutomationProxy => {
  /**
   * Due to a SV bug, raw values from {@link SV#get} and {@link SV#getAllPoints} will show extremely large values
   * where values are negative.
   *
   * @param timePoint - Time point in blick
   */
  const getActualValueMapper = ([timePoint]: [blick, number]): [blick, number] => [
    timePoint,
    automation.get(timePoint),
  ];

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
    get controlPoints(): readonly [blick, number][] {
      return automation.getAllPoints().map(getActualValueMapper);
    },
    set controlPoints(controlPoints: readonly [blick, number][]) {
      automation.removeAll();
      controlPoints.forEach(([timePoint, value]): boolean => automation.add(timePoint, value));
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
      return automation
        .getPoints(begin, end)
        .map(([timePoint]): [blick, number] => [timePoint, automation.get(timePoint)]);
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
    simplify(begin: number, end: number, threshold?: number): boolean {
      return automation.simplify(begin, end, threshold);
    },
    _rawAutomation(): Automation {
      return automation;
    },
  };
};
