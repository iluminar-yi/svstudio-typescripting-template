import { MeasureMark, NestedObject, TempoMark, TimeAxis } from 'svstudio-scripts-typing';

import MockMeasureMark from './mock-measure-mark';
import MockTempoMark from './mock-tempo-mark';

const MockTimeAxis: TimeAxis = {
  addMeasureMark(): void {},

  addTempoMark(): void {},

  clone(): TimeAxis {
    return this;
  },

  getAllMeasureMarks(): MeasureMark[] {
    return [];
  },

  getAllTempoMarks(): TempoMark[] {
    return [];
  },

  getBlickFromSeconds(): number {
    return 0;
  },

  getIndexInParent(): number {
    return 0;
  },

  getMeasureAt(): number {
    return 0;
  },

  getMeasureMarkAt(): MeasureMark {
    return MockMeasureMark;
  },

  getMeasureMarkAtBlick(): MeasureMark {
    return MockMeasureMark;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getSecondsFromBlick(): number {
    return 0;
  },

  getTempoMarkAt(): TempoMark {
    return MockTempoMark;
  },

  isMemoryManaged(): boolean {
    return false;
  },

  removeMeasureMark(): boolean {
    return false;
  },

  removeTempoMark(): boolean {
    return false;
  },
};

export default MockTimeAxis;
