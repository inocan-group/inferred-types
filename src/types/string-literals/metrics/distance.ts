import { DISTANCE_METRICS_LOOKUP } from "inferred-types/constants";
import { OptSpace } from "../character-sets";

type DistanceMetricsLookup = typeof DISTANCE_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **distance**.
 */
export type DistanceMetrics = {
  [K in keyof DistanceMetricsLookup]: "name" extends keyof DistanceMetricsLookup[K]
    ? DistanceMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **distance**.
 */
export type DistanceUom = {
  [K in keyof DistanceMetricsLookup]: "abbrev" extends keyof DistanceMetricsLookup[K]
    ? DistanceMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Distance**
 *
 * A _distance_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `DistanceAbbrev`
 */
export type Distance = `${number}${OptSpace}${DistanceUom}`;
