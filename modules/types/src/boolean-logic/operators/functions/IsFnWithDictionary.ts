import type {
    And,
    AnyFunction,
    AnyObject,
    DoesExtend,
    If,
    IsEmptyObject,
    IsEqual,
} from "inferred-types/types";

/**
 * **IsFnWithParams**`<TFn, [TParamMatch]>`
 *
 * Checks whether `T` is a function which also includes
 * key/value dictionary sitting alongside the function.
 *
 * - the optional `TParamMatch` will ensure that this generic _extends_
 * the params included in the function.
 */
export type IsFnWithDictionary<
    TFn,
    TParamMatch extends object | undefined = undefined,
> = TFn extends AnyFunction
    ? IsEmptyObject<TFn> extends true
        ? false
        : // there are some props on TFn
        If<
            And<[
                // the Fn extends the param matcher
                DoesExtend<TFn, TParamMatch>,
                // TParamMatch is set
                DoesExtend<TParamMatch, AnyObject>,
            ]>,
            true,
            If<IsEqual<TParamMatch, undefined>, true, false>
        >
    : false;
