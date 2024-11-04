import { TEMPERATURE_METRICS_LOOKUP } from "inferred-types";
import { OptSpace } from "../character-sets/OptionalSpace";

type TemperatureMetricsLookup = typeof TEMPERATURE_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Temperature**.
 */
export type TemperatureMetrics = {
  [K in keyof TemperatureMetricsLookup]: "name" extends keyof TemperatureMetricsLookup[K]
    ? TemperatureMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Temperature**.
 */
export type TemperatureUom = {
  [K in keyof TemperatureMetricsLookup]: "abbrev" extends keyof TemperatureMetricsLookup[K]
    ? TemperatureMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Temperature**
 *
 * A _Temperature_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `TemperatureUom`
 */
export type Temperature = `${number}${OptSpace}${TemperatureUom}`;

