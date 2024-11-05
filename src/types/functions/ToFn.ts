import { AnyFunction, FnMeta, IsNever } from "inferred-types/dist/types/index";

/**
 * **ToFn**`<T>`
 *
 * Ensures that resultant type is a function, where the mapping is:
 *
 *  - `AnyFunction` - function signature maintained
 *  - `FnMeta` - is converted to a precise function type
 *  - `never` _or_ `ErrorCondition` - returned "as is"
 *
 * All other values will return a function of the form `() => T`
 *
 * **Related:** `AsFn`
 */
export type ToFn<T> = T extends AnyFunction
    ? T
    : T extends FnMeta<infer _Args, infer _Returns, infer Props, infer Fn>
      ? IsNever<Props> extends true
        ? Fn
        : Fn & Props
  : () => T
