import { LeftRight } from "../../types/base";

/**
 * **left**(value)
 * 
 * Extracts the _left_ value from a `LeftRight` struct.
 */
export const left = <T extends LeftRight>(value: T) => value[2] as T[2];
