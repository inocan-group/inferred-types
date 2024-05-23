/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */


import { TypedFunction } from "./TypedFunction";

/**
 * **AnyFunction**
 * 
 * A type which is meant to match on _all_ types of functions which can exist.
 */
export type AnyFunction = Function | TypedFunction ;
