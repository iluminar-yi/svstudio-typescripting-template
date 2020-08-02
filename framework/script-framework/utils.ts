import { ManagedSynthV, blick, measure, second } from '../types';

import { Utils } from './types';

export const utilsFactory = (SV: ManagedSynthV): Utils => {
  const timeAxis = SV.getProject().getTimeAxis();

  return {
    blackKey: SV.blackKey.bind(SV),
    blick2Quarter: SV.blick2Quarter.bind(SV),
    quarter2Blick: SV.quarter2Blick.bind(SV),
    blick2Seconds: SV.blick2Seconds.bind(SV),
    seconds2Blick: SV.seconds2Blick.bind(SV),
    blickRoundDiv: SV.blickRoundDiv.bind(SV),
    blickRoundTo: SV.blickRoundTo.bind(SV),
    freq2Pitch: SV.freq2Pitch.bind(SV),
    pitch2Freq: SV.pitch2Freq.bind(SV),
    getTimePointInSeconds(timePointInBlick: blick): second {
      return timeAxis.getSecondsFromBlick(timePointInBlick);
    },
    getTimePointInBlicks(timePointInSeconds: second): blick {
      return timeAxis.getBlickFromSeconds(timePointInSeconds);
    },
    getMeasureAtTimePoint(timePoint: blick): measure {
      return timeAxis.getMeasureAt(timePoint);
    },
  };
};
