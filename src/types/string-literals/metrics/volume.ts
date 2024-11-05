import { VOLUME_METRICS_LOOKUP } from "inferred-types/dist/constants/index";
import { OptSpace } from "../character-sets/OptionalSpace";

type VolumeMetricsLookup = typeof VOLUME_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **distance**.
 */
export type VolumeMetrics = {
  [K in keyof VolumeMetricsLookup]: "name" extends keyof VolumeMetricsLookup[K]
    ? VolumeMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Volume**.
 */
export type VolumeUom = {
  [K in keyof VolumeMetricsLookup]: "abbrev" extends keyof VolumeMetricsLookup[K]
    ? VolumeMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Volume**
 *
 * A _volume_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `VolumeUom`
 */
export type Volume = `${number}${OptSpace}${VolumeUom}`;

