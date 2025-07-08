import type { TIME_METRICS_LOOKUP } from "inferred-types/constants";
import type { OptSpace } from "inferred-types/types";

type TimeMetricsLookup = typeof TIME_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Time**.
 */
export type TimeMetrics = {
    [K in keyof TimeMetricsLookup]: "name" extends keyof TimeMetricsLookup[K]
        ? TimeMetricsLookup[K]["name"]
        : never
}[number];

/**
 * Unit of measure for metrics associated with **Time**.
 */
export type TimeUom = {
    [K in keyof TimeMetricsLookup]: "abbrev" extends keyof TimeMetricsLookup[K]
        ? TimeMetricsLookup[K]["abbrev"]
        : never
}[number];

/***
 * **Time**
 *
 * A _time_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `TimeUom`
 */
export type TimeMetric = `${number}${OptSpace}${TimeUom}`;
