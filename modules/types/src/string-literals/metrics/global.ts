import type {
    Acceleration,
    AccelerationUom,
    AfterFirst,
    Area,
    AreaUom,
    Current,
    CurrentUom,
    Distance,
    DistanceUom,
    First,
    Frequency,
    FrequencyUom,
    Luminosity,
    LuminosityUom,
    Mass,
    MassUom,
    Power,
    PowerUom,
    Pressure,
    PressureUom,
    Resistance,
    ResistanceUom,
    Speed,
    SpeedUom,
    Temperature,
    TemperatureUom,
    TimeMetric,
    TimeUom,
    Voltage,
    VoltageUom,
    Volume,
    VolumeUom,
} from "inferred-types/types";

/**
 * **MetricCategory**
 *
 * A valid "category" for a `Metric` or `Uom`.
 *
 * **Related:** `Uom`, `Metric`
 */
export type MetricCategory
    = | "Acceleration"
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

type UnitsByCategory<
    T extends string,
    M extends readonly [string, string][],
    R extends string = never,
> = [] extends M
    ? R
    : UnitsByCategory<
        T,
        AfterFirst<M>,
        T extends First<M>[0]
            ? R | First<M>[1]
            : R
    >;

/**
 * **Uom**`<[T]>`
 *
 * A _unit of measure_ for a **metric**.
 *
 * - you may filter down to only units of a certain category(s) of `MetricCategory`
 * by adjusting `T`.
 *
 * **Related:** `Metric`, `MetricCategory`, `AreaUom`, `SpeedUom`, ...
 */
export type Uom<T extends MetricCategory = MetricCategory> = UnitsByCategory<T, [
    ["Acceleration", AccelerationUom],
    ["Area", AreaUom],
    ["Current", CurrentUom],
    ["Distance", DistanceUom],
    ["Frequency", FrequencyUom],
    ["Luminosity", LuminosityUom],
    ["Mass", MassUom],
    ["Power", PowerUom],
    ["Pressure", PressureUom],
    ["Resistance", ResistanceUom],
    ["Speed", SpeedUom],
    ["Temperature", TemperatureUom],
    ["Time", TimeUom],
    ["Volume", VoltageUom],
    ["Voltage", VolumeUom],
]>;

/**
 * **Metric**`<T>`
 *
 * A measurement which includes a numeric value plus the Unit of Measure (UOM).
 *
 * - you may filter down to only metrics of a certain category(s) of `MetricCategory`
 * by adjusting `T`.
 *
 * **Related:** `Uom`, `MetricCategory`
 */
export type Metric<T extends MetricCategory = MetricCategory> = UnitsByCategory<T, [
    ["Acceleration", Acceleration],
    ["Area", Area],
    ["Current", Current],
    ["Distance", Distance],
    ["Frequency", Frequency],
    ["Luminosity", Luminosity],
    ["Mass", Mass],
    ["Power", Power],
    ["Pressure", Pressure],
    ["Resistance", Resistance],
    ["Speed", Speed],
    ["Temperature", Temperature],
    ["TimeMetric", TimeMetric],
    ["Voltage", Voltage],
    ["Volume", Volume],
]>;
