import type {
    Api,
    Dictionary,
    ErrorCondition,
    EscapeFunction,
    FnKeyValue,
    GetEscapeFunction,
    TypedFunction,
} from "inferred-types/types";

/**
 * **HasEscapeFunction**`<T>`
 *
 * Checks whether the API surface passed in has an escape function defined.
 */
export type HasEscapeFunction<
    T extends Dictionary | TypedFunction | Api,
> = GetEscapeFunction<T> extends ErrorCondition
    ? false
    : true;

export type IsEscapeFunction<T> = T extends TypedFunction
    ? T extends EscapeFunction
        ? FnKeyValue<T> extends { escape: true }
            ? true
            : false
        : false
    : false;
