import {  SPEED_METRICS_LOOKUP } from "@inferred-types/constants";
import { OptSpace } from "../character-sets";

type SpeedMetricsLookup = typeof SPEED_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Speed**.
 */
export type SpeedMetrics = {
  [K in keyof SpeedMetricsLookup]: "name" extends keyof SpeedMetricsLookup[K]
    ? SpeedMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Speed**.
 */
export type SpeedUom = {
  [K in keyof SpeedMetricsLookup]: "abbrev" extends keyof SpeedMetricsLookup[K]
    ? SpeedMetricsLookup[K]["abbrev"]
    : never
}[number];

/***
 * **Speed**
 *
 * A _speed_ based measurement which leads with a number and follows with
 * a speed UOM.
 */
export type Speed = `${number}${OptSpace}${SpeedUom}`;

