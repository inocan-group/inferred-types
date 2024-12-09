import type { CURRENT_METRICS_LOOKUP } from "inferred-types/constants";
import type { OptSpace } from "../character-sets/OptionalSpace";

type CurrentMetricsLookup = typeof CURRENT_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Current**.
 */
export type CurrentMetrics = {
  [K in keyof CurrentMetricsLookup]: "name" extends keyof CurrentMetricsLookup[K]
    ? CurrentMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Current**.
 */
export type CurrentUom = {
  [K in keyof CurrentMetricsLookup]: "abbrev" extends keyof CurrentMetricsLookup[K]
    ? CurrentMetricsLookup[K]["abbrev"]
    : never
}[number];

/***
 * **Current**
 *
 * A _current_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `CurrentAbbrev`
 */
export type Current = `${number}${OptSpace}${CurrentUom}`;
