import { LUMINOSITY_METRICS_LOOKUP } from "src/constants/index";
import { OptSpace } from "../character-sets/OptionalSpace";

type LuminosityMetricsLookup = typeof LUMINOSITY_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **luminosity**.
 */
export type LuminosityMetrics = {
  [K in keyof LuminosityMetricsLookup]: "name" extends keyof LuminosityMetricsLookup[K]
    ? LuminosityMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Luminosity**.
 */
export type LuminosityUom = {
  [K in keyof LuminosityMetricsLookup]: "abbrev" extends keyof LuminosityMetricsLookup[K]
    ? LuminosityMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Luminosity**
 *
 * A _luminosity_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `LuminosityAbbrev`
 */
export type Luminosity = `${number}${OptSpace}${LuminosityUom}`;

