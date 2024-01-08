/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import type { 
  AnyObject, 
  ExpandRecursively, 
  IfEqual, 
  IndexableObject, 
  RemoveIndex, 
  RegularFn, 
  IfTrue,
  AnyFunction
} from "src/types/index";
/**
 * **FnWithDict**
 * 
 * Represents any function which is intersected with a dictionary of KV's.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDictOld<
  TArgs extends readonly unknown[] = unknown[],
  TReturn = unknown,
  TDict extends AnyObject | "no-props" = "no-props",
> = IfEqual<
  TDict, "no-props", 
  RegularFn<TArgs,TReturn>,
  ((...args: TArgs) => TReturn) & ExpandRecursively<RemoveIndex<TDict & IndexableObject>>
>;

/**
 * **JustFunction**`<T>`
 * 
 * Type utility which strips off any dictionary properties that may have existed
 * on the function passed in as `T` and leaves just the pure function signature.
 */
export type JustFunction<
  TFn extends AnyFunction
> = <T extends readonly unknown[]>(...args: T & Parameters<TFn>) => ReturnType<TFn>;

/**
 * **FnWithDict**`<TFn,TProps,[TClone]>`
 * 
 * Represents any function which is intersected with a dictionary of KV's.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TFn extends AnyFunction,
  TProps extends AnyObject,
  TClone extends boolean | null | undefined = true
> = IfTrue<
  TClone,
  JustFunction<TFn> & TProps,
  TFn & TProps 
>;
