import { MASS_METRICS_LOOKUP } from "inferred-types";
import { OptSpace } from "../character-sets/OptionalSpace";

type MassMetricsLookup = typeof MASS_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **distance**.
 */
export type MassMetrics = {
  [K in keyof MassMetricsLookup]: "name" extends keyof MassMetricsLookup[K]
    ? MassMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Mass**.
 */
export type MassUom = {
  [K in keyof MassMetricsLookup]: "abbrev" extends keyof MassMetricsLookup[K]
    ? MassMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Mass**
 *
 * A _mass_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `MassAbbrev`
 */
export type Mass = `${number}${OptSpace}${MassUom}`;

