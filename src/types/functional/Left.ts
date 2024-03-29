import { LeftRight } from "src/types/index";

/**
 * **Left**<T>
 * 
 * Extracts the **left** value from a `LeftRight`.
 */
export type Left<T extends LeftRight> = T[1];
