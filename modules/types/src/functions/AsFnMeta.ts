import type {
    AnyFunction,
    EmptyObject,
    ExpandDictionary,
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
        ? FnMeta<
            TFn,
            Parameters<TFn>,
            ReturnType<TFn>,
            ExpandDictionary<FnKeyValue<TFn>>
        >
        : FnMeta<TFn, Parameters<TFn>, ReturnType<TFn>, EmptyObject>

    : FnMeta<TypedFunction, any[], any, EmptyObject>;

type _x = FnMeta<TypedFunction, any[], any, EmptyObject>;
