import { And, AnyFunction, Container, DefineModifiers, EmptyObject, HasModifier, IsAny, IsLiteralContainer, IsLiteralScalar, IsNever, IsTuple, Scalar, Values } from "inferred-types/types";

// Forward declare to avoid circular dependencies
type IsLiteralValue<T> = T extends string | number | bigint | boolean | symbol | null | undefined
    ? string | number | bigint | boolean | symbol extends T
        ? false
        : true
    : T extends readonly unknown[]
    ? false // Arrays are handled separately
    : T extends object
    ? IsLiteralObject<T>
    : false;

type AllValuesAreLiteral<T extends readonly unknown[]> = And<{
    [K in keyof T]: T[K] extends Scalar
        ? IsLiteralScalar<T[K]>
        : T[K] extends Container
            ? IsLiteralContainer<T[K]>
        : T[K] extends AnyFunction
            ? IsLiteralFunction<T[K]>
        : never
}>


export type LiteralObjectModifiers = DefineModifiers<["allow-wide-values"]>;

/**
 * **IsLiteralObject**`<T,[U]>`
 *
 * Boolean operator which tests whether `T` is a literal object. To
 * be a literal object `T` must:
 *
 * - have 1 or more known keys
 * - the known key's _values_ are literal types
 * - can not be a union of literal objects
 *
 * If you want to allow for _wide_ value types, you can set `U` to `accept-wide-values` and this
 * will ensure the object's shape (as defined by it's keys) is a literal but allows more flexibility
 * for the key values.
 *
 ***Related:** `IsLiteralLikeObject`, `IsWideObject`
 */
export type IsLiteralObject<T,U extends LiteralObjectModifiers = null> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [IsTuple<T>] extends [true]
? false
: [T] extends [readonly unknown[]]
? false
: [T] extends [(...args: any[]) => any]
? false
: [T] extends [object]
    ? [number] extends [keyof T]
        ? false
    : [keyof T] extends [never]
        ? false
    : [string] extends [keyof T]
        ? false
    : [keyof T] extends [never]
        ? false
    : number extends keyof T
        ? false
        : HasModifier<"allow-wide-values",U,LiteralObjectModifiers> extends true
            ? true
            : AllValuesAreLiteral<Values<T>>
: false;

