import type {
    Dictionary,
    If,
    IsTrue,
    JustFunction,
    TypedFunction,
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
    TProps extends Dictionary,
    TClone extends boolean | null | undefined = true,
> = If<
    IsTrue<TClone>,
  JustFunction<TFn> & TProps,
  TFn & TProps
>;
