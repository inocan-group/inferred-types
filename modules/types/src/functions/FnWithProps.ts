import type {
    Dictionary,
    TypedFunction,
} from "inferred-types/types";
import type { ExpandRecursively } from "../literals/ExpandRecursively";

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
> = TFn & ExpandRecursively<TProps>;
