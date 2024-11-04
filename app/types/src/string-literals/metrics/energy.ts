import { ENERGY_METRICS_LOOKUP } from "inferred-types";
import { OptSpace } from "../character-sets/OptionalSpace";

type EnergyMetricsLookup = typeof ENERGY_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Energy**.
 */
export type EnergyMetrics = {
  [K in keyof EnergyMetricsLookup]: "name" extends keyof EnergyMetricsLookup[K]
    ? EnergyMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Energy**.
 */
export type EnergyUom = {
  [K in keyof EnergyMetricsLookup]: "abbrev" extends keyof EnergyMetricsLookup[K]
    ? EnergyMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Energy**
 *
 * A _energy_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `EnergyAbbrev`
 */
export type Energy = `${number}${OptSpace}${EnergyUom}`;

