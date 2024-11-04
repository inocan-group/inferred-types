import { FREQUENCY_METRICS_LOOKUP } from "inferred-types";
import { OptSpace } from "../character-sets/OptionalSpace";

type FrequencyMetricsLookup = typeof FREQUENCY_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Frequency**.
 */
export type FrequencyMetrics = {
  [K in keyof FrequencyMetricsLookup]: "name" extends keyof FrequencyMetricsLookup[K]
    ? FrequencyMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Frequency**.
 */
export type FrequencyUom = {
  [K in keyof FrequencyMetricsLookup]: "abbrev" extends keyof FrequencyMetricsLookup[K]
    ? FrequencyMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Frequency**
 *
 * A _frequency_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `FrequencyAbbrev`
 */
export type Frequency = `${number}${OptSpace}${FrequencyUom}`;

