import { Automation, Definition, ParameterType } from 'svstudio-scripts-typing';

import { blick } from '../../types';

/**
 * Serializable information from {@link Automation}.
 */
export interface AutomationMeta {
  /**
   * Get/set all control points of this automation.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getAllPoints
   */
  controlPoints: readonly [blick, number][];
}

/**
 * Full functional replacement for {@link Automation}.
 */
export interface AutomationProxy extends AutomationMeta {
  /**
   * Add a control point with position b (blicks) and parameter value v.
   * If there is already a point on b, the parameter value will get updated to v.
   * <br>
   * Return true if a new point has been created.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#add
   * @param timePoint - A specific point in time (measured in blicks).
   * @param value - An automation value to be set at.
   */
  add(timePoint: blick, value: number): boolean;

  /**
   * Get the interpolated parameter value at position b (blicks).
   * If a point exists at b, the interpolation is guaranteed to return the value for the point,
   * regardless of the interpolation method.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#get
   * @param timePoint - A specific point in time (measured in blicks).
   */
  getInterpolatedValueAt(timePoint: blick): number;

  /**
   * Get a {@link Definition} object.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getDefinition
   */
  readonly definition: Definition;

  /**
   * Get how values between control points are interpolated in this automation.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getInterpolationMethod
   */
  readonly interpolationMethod: 'Linear' | 'Cosine' | 'Cubic';

  /**
   * A version of {@link Automation#get} that uses linear interpolation (even if {@link Automation#getInterpolationMethod} is not "Linear")..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getLinear
   * @param timePoint - A specific point in time (measured in blicks).
   */
  getLinearInterpolatedValuAt(timePoint: blick): number;

  /**
   * Get an array of control points whose positions are between begin and end (blicks).
   * Each element in the array is an array of two elements: a number for the position (blicks) and a number
   * for the parameter value.
   * For example, [[0, 0.1], [5000, 0], [10000, -0.1]]..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getPoints
   * @param begin - Beginning point in time to process.
   * @param end - Ending point in time to process.
   */
  getPointsInRange(begin: blick, end: blick): [blick, number][];

  /**
   * Get the parameter type for this Automation. See the {@link ParameterType}..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#getType
   */
  readonly type: ParameterType;

  /**
   * Remove the control point at position b (blicks) if there is one.
   * <br>
   * Return true if any point has been removed..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#remove
   * @param timePoint - A specific point in time (measured in blicks).
   */
  removeAt(timePoint: blick): boolean;

  /**
   * Remove all control points between position begin (blicks) and end (blicks).
   * <br>
   * Return true if any point has been removed; return false if there's no point in the specified range..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#remove
   * @param begin - Beginning point in time to process.
   * @param end - Ending point in time to process.
   */
  removeInRange(begin: blick, end: blick): boolean;

  /**
   * Remove all control points in the Automation..
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#removeAll
   */
  removeAll(): void;

  /**
   * Simplify the parameter curve from position begin (blicks) to position end (blicks) by removing control points
   * that do not significantly contribute to the curve's shape.
   * If threshold is not provided, it will be set to 0.002. Higher values of threshold will result in more simplification.
   * <br>
   * Return true if any point has been removed.
   *
   * @see https://dreamtonics.com/synthv/scripting/Automation.html#simplify
   * @param begin - Beginning point in time to process.
   * @param end - Ending point in time to process.
   * @param threshold - Threshold of simplification. Default to 0.002.
   */
  simplify(begin: number, end: number, threshold?: number): boolean;

  /**
   * Returns the underlying {@link Automation} object.
   */
  _rawAutomation(): Automation;
}
