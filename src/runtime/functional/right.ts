import { LeftRight } from "src/types";

/**
 * **left**(value)
 * 
 * Extracts the _right_ value from a `LeftRight` struct.
 */
export const right = <T extends LeftRight>(value: T) => value[1] as T[1];
