import type {
    As,
    DefineModifiers,
    EmptyObject,
    HasModifier,
    IsAny,
    IsBoolean,
    IsLiteralLikeObject,
    IsLiteralUnion,
    IsMixedUnion,
    IsNever,
    IsTrue,
    IsUnion,
    IsWideBoolean,
    ObjectKeys,
    Or,
} from "inferred-types/types";
import type { IsFalse } from "../scalar/boolean/IsFalse";
import type { IsLiteralTuple } from "./IsLiteralTuple";

/**
 * the _modifiers_ which `IsLiteralLike` utility exposes
 */
export type LiteralLikeModifiers = DefineModifiers<["allow-variadic-tail", "exclude-unions", "allow-mixed-unions"]>;

/**
 * **IsLiteralLike**`<T,[U]>`
 *
 * Boolean utility which returns `true` when `T` is _literal like_. This means `true` is returned
 * any time `T` is:
 *
 * - any type which passed the `IsLiteral<T>` test
 * - any _object_ where the **shape** is literal-like (known keys, literal-like values)
 * - any _tuple_ where the **shape** is literal-like
 * - any _union type_ where all members are literal types (unless excluded)
 *
 * In essence, the **main** differences between a `Literal` type and a `LiteralLike` type are:
 *
 * 1. that _container_ types provide a literal _shape_ even if their type values are not always literal types.
 * 2. unions which have only literal elements are also allowed in unless explicitly disqualified:
 *
 *     - using `exclude-unions` makes it so no matching on union types is done
 *     - using `allow-mixed-unions` increases the matches on union types to include not only _literal unions_
 *     but _mixed unions_ which are unions that include some literal elements but also some wide elements
 *
 * 3. The boundary literals `any` and `never` are NEVER considered a _literal like_ type
 *
 * **Related:**
 * - `IsLiteral`, `IsWideType`
 * - `IsLiteralLikeTuple`, `IsLiteralLikeObject`
 * - `IsLiteralUnion`, `IsWideUnion`, `IsMixedUnion`
 */
export type IsLiteralLike<T, U extends null | LiteralLikeModifiers = null> =
[IsAny<T>] extends [true]
        ? false
    : [IsNever<T>] extends [true]
        ? false
    : [EmptyObject] extends [T]
        ? number extends As<ObjectKeys<T>, readonly unknown[]>["length"]
            ? false
            : true
    : [string] extends [T]
        ? false
    : [number] extends [T]
        ? false
    : [bigint] extends [T]
        ? false
    : [symbol] extends [T]
        ? false
    : [T] extends [string]
        ? true
    : [T] extends [number]
        ? true
    : [T] extends [bigint]
        ? true


    : [IsBoolean<T>] extends [true]
        ? true
    : [T] extends [symbol]
        ? true
    : [T] extends [null | undefined]
        ? true
    : [IsUnion<T>] extends [true]
        ? [HasModifier<"exclude-unions", U, LiteralLikeModifiers>] extends [true]
            ? false
            : [HasModifier<"allow-mixed-unions", U, LiteralLikeModifiers>] extends [true]
                ? IsLiteralUnion<T> extends true
                    ? true
                    : IsMixedUnion<T> extends true
                        ? true
                    : false
                : IsLiteralUnion<T>
    : [T] extends [readonly unknown[]]
        ? IsLiteralTuple<T>
    : [object] extends [T]
        ? false
    : [string] extends [keyof T]
        ? false
    : [T] extends [object]
        ? IsLiteralLikeObject<T>
        : false;

type X = IsLiteralUnion<boolean>;
