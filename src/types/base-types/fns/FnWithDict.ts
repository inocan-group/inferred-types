/* eslint-disable @typescript-eslint/ban-types */
import type { IndexableObject, NarrowingFn } from "src/types";
import { RegularFn } from "./RegularFn";
/**
 * **FnWithDict**
 * 
 * Represents any function which is intersected with a given dictionary key/value.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TDict extends IndexableObject = {},
  TArgs extends readonly unknown[] = [],
  TReturn = unknown
> = (RegularFn<TArgs,TReturn> & TDict) | (NarrowingFn<TArgs,TReturn> & TDict);

