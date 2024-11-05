import { LeftRight } from "inferred-types/dist/types/index";

/**
 * **Left**<T>
 *
 * Extracts the **left** value from a `LeftRight`.
 */
export type Left<T extends LeftRight> = T[1];
