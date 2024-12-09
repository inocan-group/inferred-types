/* eslint-disable ts/no-unsafe-function-type */

import type { TypedFunction } from "./TypedFunction";

/**
 * **AnyFunction**
 *
 * A type which is meant to match on _all_ types of functions which can exist.
 */
export type AnyFunction = Function | TypedFunction;
