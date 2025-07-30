import type {
    DefineModifiers,
    HasModifier,
    IsAny,
    IsLiteralLikeObject,
    IsLiteralUnion,
    IsNever,
    IsTrue,
    IsUnion,
} from "inferred-types/types";
import { IsLiteralTuple } from "./IsLiteralTuple";
import { IsFalse } from '../IsFalse';

export type LiteralLikeModifiers = DefineModifiers<["allow-variadic-tail","exclude-unions"]>;

/**
 * **IsLiteralLike**`<T,[U]>`
 *
 * Boolean utility which returns `true` when `T` is _literal like_. This means `true` is returned
 * any time `T` is:
 *
 * - a pure _literal_ value excluding `any` or `never`
 * - any _object_ where the shape is literal-like (known keys, literal-like values)
 * - any _tuple_ where the shape is literal-like
 * - any _union type_ where all members are literal types (unless excluded)
 *
 * In essence, the **main** differences between a `Literal` type and a `LiteralLike` type are:
 *
 * 1. that _container_ types provide a literal _shape_ even if their type values are not always literal types.
 * 2. unions which have only literal elements are also allowed in unless explicitly disqualified
 * 3. The boundary literals `any` and `never` are NEVER considered a _literal like_ type
 *
 * **Related:**
 * - `IsLiteral`, `IsWideType`
 * - `IsLiteralUnion`, `IsWideUnion`, `IsMixedUnion`
 */
export type IsLiteralLike<T, U extends null | LiteralLikeModifiers = null> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
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

: [IsTrue<T>] extends [true]
    ? true
: [IsFalse<T>] extends [true]
    ? true
: [T] extends [symbol]
    ? true
: [T] extends [null | undefined]
    ? true
: [IsUnion<T>] extends [true]
    ? [HasModifier<"exclude-unions", U, LiteralLikeModifiers>] extends [true]
        ? false
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



