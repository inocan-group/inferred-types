import type { Acceleration, AccelerationUom } from "./acceleration";
import type { Area, AreaUom } from "./area";
import type { Current, CurrentUom } from "./current";
import type { Distance, DistanceUom } from "./distance";
import type { Frequency, FrequencyUom } from "./frequency";
import type { Luminosity, LuminosityUom } from "./luminosity";
import type { Mass, MassUom } from "./mass";
import type { Power, PowerUom } from "./power";
import type { Pressure, PressureUom } from "./pressure";
import type { Resistance, ResistanceUom } from "./resistance";
import type { Speed, SpeedUom } from "./speed";
import type { Temperature, TemperatureUom } from "./temperature";
import type { TimeMetric, TimeUom } from "./time";
import type { Voltage, VoltageUom } from "./voltage";
import type { Volume, VolumeUom } from "./volume";

/**
 * A measurement which includes a numeric value plus the Unit of Measure (UOM).
 *
 * **Related:** `Uom`
 */
export type Metric =
  | Acceleration
  | Area
  | Current
  | Distance
  | Frequency
  | Luminosity
  | Mass
  | Power
  | Pressure
  | Resistance
  | Speed
  | Temperature
  | TimeMetric
  | Voltage
  | Volume;

export type MetricCategory =
  | "Acceleration"
  | "Area"
  | "Current"
  | "Distance"
  | "Frequency"
  | "Luminosity"
  | "Mass"
  | "Power"
  | "Pressure"
  | "Resistance"
  | "Speed"
  | "Temperature"
  | "Time"
  | "Voltage"
  | "Volume";

/**
 * **Uom**
 *
 * A _unit of measure_ for a **metric**.
 *
 * **Related:** `Metric`, `AreaUom`, `SpeedUom`,`MassUom`, `DistanceUom`, ...
 */
export type Uom =
  | AccelerationUom
  | AreaUom
  | CurrentUom
  | DistanceUom
  | FrequencyUom
  | LuminosityUom
  | MassUom
  | PowerUom
  | PressureUom
  | ResistanceUom
  | SpeedUom
  | TemperatureUom
  | TimeUom
  | VoltageUom
  | VolumeUom;
