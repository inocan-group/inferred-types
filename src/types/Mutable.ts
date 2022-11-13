import { IsObject } from "./type-checks";

/**
 * Makes a readonly structure mutable
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: IsObject<T[K]> extends true ? Mutable<T[K]> : T[K];
};
