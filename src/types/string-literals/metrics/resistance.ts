import { RESISTANCE_METRICS_LOOKUP } from "inferred-types/dist/constants/index";
import { OptSpace } from "../character-sets/OptionalSpace";

type ResistanceMetricsLookup = typeof RESISTANCE_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **resistance**.
 */
export type ResistanceMetrics = {
  [K in keyof ResistanceMetricsLookup]: "name" extends keyof ResistanceMetricsLookup[K]
    ? ResistanceMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **resistance**.
 */
export type ResistanceUom = {
  [K in keyof ResistanceMetricsLookup]: "abbrev" extends keyof ResistanceMetricsLookup[K]
    ? ResistanceMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Resistance**
 *
 * A_ resistance_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `ResistanceAbbrev`
 */
export type Resistance = `${number}${OptSpace}${ResistanceUom}`;

