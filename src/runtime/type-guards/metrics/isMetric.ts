import {
  Acceleration,
  Area,
  Current,
  Distance,
  Energy,
  Frequency,
  Luminosity,
  Mass,
  Metric,
  Power,
  Pressure,
  Resistance,
  Speed,
  Temperature,
  TimeMetric,
  Voltage,
  Volume
} from "inferred-types/dist/types/index";
import { isString } from "../isString";
import {
  ACCELERATION_METRICS_LOOKUP,
  AREA_METRICS_LOOKUP,
  CURRENT_METRICS_LOOKUP,
  DISTANCE_METRICS_LOOKUP,
  ENERGY_METRICS_LOOKUP,
  FREQUENCY_METRICS_LOOKUP,
  LUMINOSITY_METRICS_LOOKUP,
  MASS_METRICS_LOOKUP,
  NUMERIC_CHAR,
  POWER_METRICS_LOOKUP,
  PRESSURE_METRICS_LOOKUP,
  RESISTANCE_METRICS_LOOKUP,
  SPEED_METRICS_LOOKUP,
  TEMPERATURE_METRICS_LOOKUP,
  TIME_METRICS_LOOKUP,
  VOLTAGE_METRICS_LOOKUP,
  VOLUME_METRICS_LOOKUP,
} from "inferred-types/dist/constants/index";
import {  stripWhile } from "src/runtime/literals";


const separate = (s: string) => {
  return stripWhile(s.toLowerCase(), ...NUMERIC_CHAR).trim()
}

export const isAreaMetric = (val: unknown): val is Area => {
  return isString(val) && AREA_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isLuminosityMetric = (val: unknown): val is Luminosity => {
  return isString(val) && LUMINOSITY_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isResistance = (val: unknown): val is Resistance => {
  return isString(val) && RESISTANCE_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isCurrentMetric = (val: unknown): val is Current => {
  return isString(val) && CURRENT_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isVoltageMetric = (val: unknown): val is Voltage => {
  return isString(val) && VOLTAGE_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isFrequencyMetric = (val: unknown): val is Frequency => {
  return isString(val) && FREQUENCY_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isPowerMetric = (val: unknown): val is Power => {
  return isString(val) && POWER_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isTimeMetric = (val: unknown): val is TimeMetric => {
  return isString(val) && TIME_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isEnergyMetric = (val: unknown): val is Energy => {
  return isString(val) && ENERGY_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isPressureMetric = (val: unknown): val is Pressure => {
  return isString(val) && PRESSURE_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isTemperatureMetric = (val: unknown): val is Temperature => {
  return isString(val) && TEMPERATURE_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isVolumeMetric = (val: unknown): val is Volume => {
  return isString(val) && VOLUME_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isAccelerationMetric = (val: unknown): val is Acceleration => {
  return isString(val) && ACCELERATION_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isSpeedMetric = (val: unknown): val is Speed => {
  const speed = SPEED_METRICS_LOOKUP.map(i => i.abbrev);
  return isString(val) && speed.includes(separate(val) as any);
}

export const isMassMetric = (val: unknown): val is Mass => {
  return isString(val) && MASS_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

export const isDistanceMetric = (val: unknown): val is Distance => {
  return isString(val) && DISTANCE_METRICS_LOOKUP.map(i => i.abbrev).includes(separate(val) as any);
}

/**
 * Type guard which validates the passed in `val` is a `Metric` (unit
 * of measure).
 */
export const isMetric = (val: unknown): val is Metric => {
  return isDistanceMetric(val)
  || isMassMetric(val)
  || isSpeedMetric(val)
  || isAccelerationMetric(val)
  || isVoltageMetric(val)
  || isTemperatureMetric(val)
  || isPressureMetric(val)
  || isEnergyMetric(val)
  || isTimeMetric(val)
  || isPowerMetric(val)
  || isFrequencyMetric(val)
  || isVoltageMetric(val)
  || isCurrentMetric(val)
  || isLuminosityMetric(val)
  || isAreaMetric(val)
}
