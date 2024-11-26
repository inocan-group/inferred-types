import {
  AccelerationUom,
  AreaUom,
  CurrentUom,
  DistanceUom,
  EnergyUom,
  FrequencyUom,
  LuminosityUom,
  MassUom,
  PowerUom,
  PressureUom,
  ResistanceUom,
  SpeedUom,
  TemperatureUom,
  TimeUom,
  Uom,
  VoltageUom,
  VolumeUom
} from "inferred-types/types";
import { isString } from "../isString";
import {
  ACCELERATION_METRICS_LOOKUP,
  AREA_METRICS_LOOKUP,
  CURRENT_METRICS_LOOKUP,
  ENERGY_METRICS_LOOKUP,
  FREQUENCY_METRICS_LOOKUP,
  LUMINOSITY_METRICS_LOOKUP,
  MASS_METRICS_LOOKUP,
  POWER_METRICS_LOOKUP,
  PRESSURE_METRICS_LOOKUP,
  RESISTANCE_METRICS_LOOKUP,
  SPEED_METRICS_LOOKUP,
  TEMPERATURE_METRICS_LOOKUP,
  TIME_METRICS_LOOKUP,
  VOLTAGE_METRICS_LOOKUP,
  VOLUME_METRICS_LOOKUP,
} from "inferred-types/constants";



export const isAreaUom = (val: unknown): val is AreaUom => {
  return isString(val) && AREA_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isLuminosityUom = (val: unknown): val is LuminosityUom => {
  return isString(val) && LUMINOSITY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isResistanceUom = (val: unknown): val is ResistanceUom => {
  return isString(val) && RESISTANCE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isCurrentUom = (val: unknown): val is CurrentUom => {
  return isString(val) && CURRENT_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isVoltageUom = (val: unknown): val is VoltageUom => {
  return isString(val) && VOLTAGE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isFrequencyUom = (val: unknown): val is FrequencyUom => {
  return isString(val) && FREQUENCY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isPowerUom = (val: unknown): val is PowerUom => {
  return isString(val) && POWER_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isTimeUom = (val: unknown): val is TimeUom => {
  return isString(val) && TIME_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isEnergyUom = (val: unknown): val is EnergyUom => {
  return isString(val) && ENERGY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isPressureUom = (val: unknown): val is PressureUom => {
  return isString(val) && PRESSURE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isTemperatureUom = (val: unknown): val is TemperatureUom => {
  return isString(val) && TEMPERATURE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isVolumeUom = (val: unknown): val is VolumeUom => {
  return isString(val) && VOLUME_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isAccelerationUom = (val: unknown): val is AccelerationUom => {
  return isString(val) && ACCELERATION_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isSpeedUom = (val: unknown): val is SpeedUom => {
  return isString(val) && SPEED_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isMassUom = (val: unknown): val is MassUom => {
  return isString(val) && MASS_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export const isDistanceUom = (val: unknown): val is DistanceUom => {
  return isString(val) && ENERGY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

/**
 * Type guard which validates the passed in `val` is a `Uom` (unit
 * of measure).
 */
export const isUom = (val: unknown): val is Uom => {
  return isDistanceUom(val)
  || isMassUom(val)
  || isSpeedUom(val)
  || isAccelerationUom(val)
  || isVoltageUom(val)
  || isTemperatureUom(val)
  || isPressureUom(val)
  || isEnergyUom(val)
  || isTimeUom(val)
  || isPowerUom(val)
  || isFrequencyUom(val)
  || isVoltageUom(val)
  || isCurrentUom(val)
  || isLuminosityUom(val)
  || isAreaUom(val)
}
