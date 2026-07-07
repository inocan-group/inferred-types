import type {
    AnyFunction,
    FnKeyValue,
    FnMeta,
    IsNonEmptyObject,
    TypedFunction,
} from "inferred-types/types";

/**
 * **AsFnMeta**`<TFn>`
 *
 * Converts any function into `FnMeta` format.
 */
export type AsFnMeta<
    TFn extends AnyFunction,
> = TFn extends TypedFunction
    ? [IsNonEmptyObject<FnKeyValue<TFn>>] extends [true]
            ? FnMeta<TFn>
            : FnMeta<TFn>

    : FnMeta<TypedFunction>;
