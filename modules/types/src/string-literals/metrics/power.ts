import type { POWER_METRICS_LOOKUP } from "inferred-types/constants";
import type { OptSpace } from "inferred-types/types";

type PowerMetricsLookup = typeof POWER_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Power**.
 */
export type PowerMetrics = {
    [K in keyof PowerMetricsLookup]: "name" extends keyof PowerMetricsLookup[K]
        ? PowerMetricsLookup[K]["name"]
        : never
}[number];

/**
 * Unit of measure for metrics associated with **Power**.
 */
export type PowerUom = {
    [K in keyof PowerMetricsLookup]: "abbrev" extends keyof PowerMetricsLookup[K]
        ? PowerMetricsLookup[K]["abbrev"]
        : never
}[number];

/***
 * **Power**
 *
 * A _power_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `PowerAbbrev`
 */
export type Power = `${number}${OptSpace}${PowerUom}`;
