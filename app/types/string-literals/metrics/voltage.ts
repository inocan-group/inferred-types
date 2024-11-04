import { VOLTAGE_METRICS_LOOKUP } from "inferred-types";
import { OptSpace } from "../character-sets/OptionalSpace";

type VoltageMetricsLookup = typeof VOLTAGE_METRICS_LOOKUP;

/**
 * The singular name for metrics associated with **Voltage**.
 */
export type VoltageMetrics = {
  [K in keyof VoltageMetricsLookup]: "name" extends keyof VoltageMetricsLookup[K]
    ? VoltageMetricsLookup[K]["name"]
    : never
}[number];

/**
 * Unit of measure for metrics associated with **Voltage**.
 */
export type VoltageUom = {
  [K in keyof VoltageMetricsLookup]: "abbrev" extends keyof VoltageMetricsLookup[K]
    ? VoltageMetricsLookup[K]["abbrev"]
    : never
}[number];


/***
 * **Voltage**
 *
 * A_ Voltage_ based measurement which leads with a number and follows with
 * a metric name.
 *
 * **Related:** `VoltageUom`
 */
export type Voltage = `${number}${OptSpace}${VoltageUom}`;

