import { CoordinateSystem, NestedObject } from 'svstudio-scripts-typing';

const MockCoordinateSystem: CoordinateSystem = {
  getIndexInParent(): number {
    return 0;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getTimePxPerUnit(): number {
    return 0;
  },

  getTimeViewRange(): [number, number] {
    return [0, 0];
  },

  getValuePxPerUnit(): number {
    return 0;
  },

  getValueViewRange(): [number, number] {
    return [0, 0];
  },

  isMemoryManaged(): boolean {
    return false;
  },

  setTimeLeft(): void {},

  setTimeRight(): void {},

  setTimeScale(): void {},

  setValueCenter(): void {},

  snap(): number {
    return 0;
  },

  t2x(): number {
    return 0;
  },

  v2y(): number {
    return 0;
  },

  x2t(): number {
    return 0;
  },

  y2v(): number {
    return 0;
  },
};

export default MockCoordinateSystem;
