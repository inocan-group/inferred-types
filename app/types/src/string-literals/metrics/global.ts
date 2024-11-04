
import { Acceleration, AccelerationUom } from "./acceleration";
import { Area, AreaUom } from "./area";
import { Current, CurrentUom } from "./current";
import { Distance, DistanceUom } from "./distance";
import { Frequency, FrequencyUom } from "./frequency";
import { Luminosity, LuminosityUom } from "./luminosity";
import { Mass, MassUom } from "./mass";
import { Power, PowerUom } from "./power";
import { Pressure, PressureUom } from "./pressure";
import { Resistance, ResistanceUom } from "./resistance";
import { Speed, SpeedUom } from "./speed";
import { Temperature, TemperatureUom } from "./temperature";
import { TimeUom, TimeMetric } from "./time";
import { Voltage, VoltageUom } from "./voltage";
import { Volume, VolumeUom } from "./volume";


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
