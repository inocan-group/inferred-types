import { LeftRight } from "src/types/index";

/**
 * **Right**<T>
 * 
 * Extracts the **right** value from a `LeftRight`.
 */
export type Right<T extends LeftRight> = T[2];
