import type {
  AnyObject,
  IsTrue,
  If,
  JustFunction,
  TypedFunction
} from "inferred-types/types";



/**
 * **FnWithProps**`<TFn,TProps,[TClone]>`
 *
 * Produces a function which is intersected with a dictionary of KV's.
 *
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithProps<
  TFn extends TypedFunction,
  TProps extends AnyObject,
  TClone extends boolean | null | undefined = true
> = If<
  IsTrue<TClone>,
  JustFunction<TFn> & TProps,
  TFn & TProps
>;
