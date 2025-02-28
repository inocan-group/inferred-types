import type { AREA_METRICS_LOOKUP } from "inferred-types/constants";
import type { OptSpace } from "../character-sets/OptionalSpace";

type AreaMetricsLookup = typeof AREA_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **distance**.
 */
export type AreaMetrics = {
    [K in keyof AreaMetricsLookup]: "name" extends keyof AreaMetricsLookup[K]
        ? AreaMetricsLookup[K]["name"]
        : never
}[number];

/**
 * Unit of measure for metrics associated with **Area**.
 */
export type AreaUom = {
    [K in keyof AreaMetricsLookup]: "abbrev" extends keyof AreaMetricsLookup[K]
        ? AreaMetricsLookup[K]["abbrev"]
        : never
}[number];

/***
 * **Area**
 *
 * A _Area_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `AreaAbbrev`
 */
export type Area = `${number}${OptSpace}${AreaUom}`;
