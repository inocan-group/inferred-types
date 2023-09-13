import { LeftRight } from "..";

/**
 * **Right**<T>
 * 
 * Extracts the **right** value from a `LeftRight`.
 */
export type Right<T extends LeftRight> = T[2];
