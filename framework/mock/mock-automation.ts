import { Automation, Definition, InterpolationMethod, NestedObject, ParameterType } from 'svstudio-scripts-typing';

import MockDefinition from './mock-definition';

const MockAutomation: Automation = {
  add(): boolean {
    return false;
  },

  clone(): Automation {
    return this;
  },

  get(): number {
    return 0;
  },

  getAllPoints(): [number, number][] {
    return [];
  },

  getDefinition(): Definition {
    return MockDefinition;
  },

  getIndexInParent(): number {
    return 0;
  },

  getInterpolationMethod(): InterpolationMethod {
    return 'Linear';
  },

  getLinear(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getPoints(): [number, number][] {
    return [];
  },

  getType(): ParameterType {
    return 'PitchDelta';
  },

  isMemoryManaged(): boolean {
    return false;
  },

  remove(): boolean {
    return false;
  },

  removeAll(): void {},

  simplify(): boolean {
    return false;
  },
};

export default MockAutomation;
