import type { ACCELERATION_METRICS_LOOKUP } from "inferred-types/constants";
import type { OptSpace } from "inferred-types/types";

type AccelerationMetricsLookup = typeof ACCELERATION_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **distance**.
 */
export type AccelerationMetrics = {
    [K in keyof AccelerationMetricsLookup]: "name" extends keyof AccelerationMetricsLookup[K]
        ? AccelerationMetricsLookup[K]["name"]
        : never
}[number];

/**
 * Unit of measure for metrics associated with **Acceleration**.
 */
export type AccelerationUom = {
    [K in keyof AccelerationMetricsLookup]: "abbrev" extends keyof AccelerationMetricsLookup[K]
        ? AccelerationMetricsLookup[K]["abbrev"]
        : never
}[number];

/***
 * **Acceleration**
 *
 * A _acceleration_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `AccelerationAbbrev`
 */
export type Acceleration = `${number}${OptSpace}${AccelerationUom}`;
