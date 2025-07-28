import type {
    IsBooleanLiteral,
    IsEmptyObject,
    IsLiteralUnion,
    IsNumericLiteral,
    IsObjectLiteral,
    IsStringLiteral,
    IsTuple,
    IsUnion,
    DefineModifiers,
    Or,
} from "inferred-types/types";

type Validations<T> = Or<[
    IsStringLiteral<T>,
    IsNumericLiteral<T>,
    IsTuple<T>,
    IsBooleanLiteral<T>,
    IsObjectLiteral<T>,
    IsEmptyObject<T>
]>;

export type LiteralLikeModifiers = DefineModifiers<["allow-variadic-tail","exclude-unions"]>;


/**
 * **IsLiteralLike**`<T,[U]>`
 *
 * Boolean utility which returns `true` when `T` is _literal like_. This means `true` is returned
 * any time `T` is:
 *
 * - a pure _literal_ value excluding `any` or `never`
 * - any _object_ where:
 *      - the number of _keys_ is either a known literal number, or
 *      - a known range of keys is known based on some/all of the keys being declared as "optional"
 *      - whenever the _keys_ of an object are equal to `number` we know it is NOT _literal like_
 * - any _array_ where:
 *      - the _values_ are all known and henceforth the number of keys is always a literal number versus
 *         being `number` (this means it's a `Tuple`)
 *      - if the generic `U` is equal to or includes the modifier `allow-variadic-tail`
 *          - `T` will be checked as having a variadic tail and if it does the
 *          result return by this utility will be whether `T` _without_ that variadic tail is _literal like_
 * - any _union type_ where:
 *      - all members of the union are _literal_ types\
 *      - if the `U` generic is equal to or has a member of `exclude-unions` then no union types will be
 *      allowed.
 *
 * In essence, the **main** differences between a `Literal` type and a `LiteralLike` type are:
 *
 * 1. that _container_ types provide a literal _shape_ even if their type values (per element, per key/value)
 * are not always literal types.
 * 2. unions which have only literal elements are also allowed in unless explicitly disqualified
 * 3. The boundary literals `any` and `never` are NEVER considered a _literal like_ type
 *
 * **Related:**
 * - `IsLiteral`, `IsWideType`
 * - `IsLiteralUnion`, `IsWideUnion`, `IsMixedUnion`
 */
export type IsLiteralLike<T, U extends null | LiteralLikeModifiers = null> =




