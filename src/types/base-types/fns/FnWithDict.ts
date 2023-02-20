/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import type { ExpandRecursively, IfEqual, IndexableObject, RemoveIndex } from "src/types";
import { RegularFn } from "./RegularFn";
/**
 * **FnWithDict**
 * 
 * Represents any function which is intersected with a dictionary of KV's.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TArgs extends readonly unknown[] = unknown[],
  TReturn = unknown,
  TDict extends AnyObject | "no-props" = "no-props",
> = IfEqual<
  TDict, "no-props", 
  RegularFn<TArgs,TReturn>,
  ((...args: TArgs) => TReturn) &  ExpandRecursively<RemoveIndex<TDict & IndexableObject>>
>;

