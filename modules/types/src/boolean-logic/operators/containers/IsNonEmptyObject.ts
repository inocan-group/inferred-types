import type {
    AnyObject,
    AsRecord,
    ExplicitlyEmptyObject,
    IsEqual,
    IsNumericLiteral,
    Keys
} from "inferred-types/types";


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
