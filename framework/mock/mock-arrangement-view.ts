import { ArrangementSelectionState, ArrangementView, CoordinateSystem, NestedObject } from 'svstudio-scripts-typing';

import MockArrangementSelectionState from './mock-arrangement-selection-state';
import MockCoordinateSystem from './mock-coordinate-system';

const MockArrangementView: ArrangementView = {
  getIndexInParent(): number {
    return 0;
  },

  getNavigation(): CoordinateSystem {
    return MockCoordinateSystem;
  },

  getParent(): NestedObject | undefined {
    return undefined;
  },

  getSelection(): ArrangementSelectionState {
    return MockArrangementSelectionState;
  },

  isMemoryManaged(): boolean {
    return false;
  },
};

export default MockArrangementView;
