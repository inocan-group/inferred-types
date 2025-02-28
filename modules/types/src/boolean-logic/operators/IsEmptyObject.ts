import type { AnyObject, AsRecord, EmptyObject, ExplicitlyEmptyObject, IsEqual, IsNumericLiteral, Keys, Or } from "inferred-types/types";

/**
 * **IsEmptyObject**`<T>`
 *
 * Boolean type util which detects whether `T` _is_ an object
 * but _has no properties_.
 *
 * **Note:** this will report **true** for `EmptyObject` and `ExplicitlyEmptyObject`
 *
 * **Related:** `IsNonEmptyObject`
 */
export type IsEmptyObject<T> = T extends AnyObject
    ? Or<[IsEqual<T, EmptyObject>, IsEqual<T, ExplicitlyEmptyObject>]> extends true
        ? true
        : Keys<AsRecord<T>>["length"] extends 0 ? true : false
    : false;

/**
 * **IsNonEmptyObject**`<T>`
 *
 * Boolean type util which detects whether `T` _is_ an object
 * and _has at least one property_.
 *
 * **Note:** this will report **false** for `EmptyObject` and `ExplicitlyEmptyObject`
 *
 * **Related:** `IsEmptyObject`
 */
export type IsNonEmptyObject<T> = T extends AnyObject
    ? Or<[IsEqual<T, EmptyObject>, IsEqual<T, ExplicitlyEmptyObject>]> extends true
        ? false
        : Keys<AsRecord<T>>["length"] extends 0
            ? false
            : IsNumericLiteral<Keys<AsRecord<T>>["length"]> extends true
                ? true
                : false
    : false;
