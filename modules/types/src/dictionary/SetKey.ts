import type { Dictionary, Widen } from "inferred-types/types";

/**
 * **SetKeyStrict**`<TObj,TKey,TVal>
 *
 * Sets one of the keys `TKey` of an object `TObj` to `TValue`
 * while ensuring that `TVal` extends the _wide_ type of `TObj[TKey]`.
 *
 * - if you want `TVal` to be unconstrained, use `ForceSetKey` instead.
 * - if you want `TVal` to be less constrained, use `SetKey` instead.
 */
export type SetKeyStrict<
    TObj extends Dictionary,
    TKey extends keyof TObj,
    TVal extends TObj[TKey],
> = {
    [K in keyof TObj]: K extends TKey
        ? TVal
        : TObj[K]
};

/**
 * **SetKey**`<TObj,TKey,TVal>
 *
 * Sets one of the keys `TKey` of an object `TObj` to `TValue`
 * while ensuring that `TVal` extends the _wide_ type of `TObj[TKey]`.
 *
 * - if you want `TVal` to be unconstrained, use `SetKeyForce`
 * instead.
 * - if you want to be constrained to the literal type use `SetKeyStrict`
 */
export type SetKey<
    TObj extends Dictionary,
    TKey extends keyof TObj,
    TVal,
> = {
    [K in keyof TObj]: K extends TKey
        ? TVal
        : TObj[K] extends Widen<TObj[K]>
            ? TObj[K]
            : never
};

/**
 * **ForceSetKey**`<TObj,TKey,TVal>
 *
 * Sets one of the keys `TKey` of an object `TObj` to `TValue`
 * even if `TValue` doesn't fit the type which `TObj` proposes.
 *
 * - if you want `TVal` to be constrained to valid keys of
 * `TObj` use `SetKey` instead.
 */
export type SetKeyForce<
    TObj extends Dictionary,
    TKey extends keyof TObj,
    TVal,
> = {
    [K in keyof TObj]: K extends TKey
        ? TVal
        : TObj[K]
};
