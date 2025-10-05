import type {
    Dictionary,
    ExpandRecursively,
    FnKeyValue,
    FnReturn,
    IsNonEmptyObject,
    TypedFunction,
    WithoutKeys
} from "inferred-types/types";

/**
 * **FnWithProps**`<TFn,TProps,[TClone]>`
 *
 * Produces a function which is intersected with a dictionary of KV's.
 *
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
type RebaseFn<
    TFn extends TypedFunction,
> = (...args: Parameters<TFn>) => FnReturn<UnderlyingFn<TFn>>;

type UnderlyingFn<T> = T extends infer F & Record<any, any>
    ? F extends (...args: any[]) => any
        ? F
        : T extends (...args: any[]) => any
            ? T
            : never
    : T extends (...args: any[]) => any
        ? T
        : never;

export type FnWithProps<
    TFn extends TypedFunction,
    TProps extends Dictionary,
> = IsNonEmptyObject<FnKeyValue<TFn>> extends true
    // function already has props: rebuild signature (loses generics) to prevent conflicts
    ? RebaseFn<TFn> & Readonly<ExpandRecursively<
        WithoutKeys<FnKeyValue<TFn>, keyof TProps> & TProps
    >>
    // function has no props: preserve original signature (including generics)
    : TFn & ExpandRecursively<TProps>;
