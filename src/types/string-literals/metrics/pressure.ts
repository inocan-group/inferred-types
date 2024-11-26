import { PRESSURE_METRICS_LOOKUP } from "inferred-types/constants";
import { OptSpace } from "../character-sets/OptionalSpace";

type PressureMetricsLookup = typeof PRESSURE_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Pressure**.
 */
export type PressureMetrics = {
  [K in keyof PressureMetricsLookup]: "name" extends keyof PressureMetricsLookup[K]
    ? PressureMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Pressure**.
 */
export type PressureUom = {
  [K in keyof PressureMetricsLookup]: "abbrev" extends keyof PressureMetricsLookup[K]
    ? PressureMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Pressure**
 *
 * A _pressure_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `PressureAbbrev`
 */
export type Pressure = `${number}${OptSpace}${PressureUom}`;

