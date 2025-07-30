import type {
    AnyObject,
    As,
    AsRecord,
    ExplicitlyEmptyObject,
    IsEqual,
    IsNumericLiteral,
    IsObject,
    Keys
} from "inferred-types/types";

/**
 * **IsEmptyObject**`<T>`
 *
 * Boolean type util which detects whether `T` _is_ an object
 * but _has no properties_.
 *
 * **Note:** this will report **true** for `ExplicitlyEmptyObject`
 * but not `EmptyObject` -- which like `Dictionary` is a wide type
 * with an _unknown_ number of keys.
 *
 * **Related:** `IsNonEmptyObject`
 */
export type IsEmptyObject<T> = [IsObject<T>] extends [true]
    ? IsEqual<T, ExplicitlyEmptyObject> extends true
        ? true
        : Keys<As<T, object>>["length"] extends 0 ? true : false
    : false;

/**
 * **IsNonEmptyObject**`<T>`
 *
 * Boolean type util which detects whether `T` _is_ an object
 * and _has at least one property_.
 *
 * **Note:** this will report **false** for`ExplicitlyEmptyObject` but
 * not `EmptyObject`
 *
 * **Related:** `IsEmptyObject`
 */
export type IsNonEmptyObject<T> = T extends AnyObject
    ? IsEqual<T, ExplicitlyEmptyObject> extends true
        ? false
        : Keys<AsRecord<T>>["length"] extends 0
            ? false
            : IsNumericLiteral<Keys<AsRecord<T>>["length"]> extends true
                ? true
                : false
    : false;
