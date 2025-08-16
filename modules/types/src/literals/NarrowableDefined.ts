import type { EmptyObject } from "inferred-types/types";

/**
 * **NarrowableDefined**
 *
 * Precisely the same as the `Narrowable` type but without _undefined_ as an option
 *
 * **Related:** `Narrowable`, `NarrowableScalar`
 */
export type NarrowableDefined = string | number | boolean | symbol | object | void | null | EmptyObject;
