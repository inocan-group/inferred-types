import { Scalar } from 'types/base-types';
import {
    DefineModifiers,
    HasModifier,
    IsAny,
    IsNever,
    IsNull,
    IsUndefined,
    IsWideBoolean,
    IsWideSymbol
} from 'inferred-types/types';


export type WideScalarModifiers = DefineModifiers<["allow-null","allow-undefined"]>;

/**
 * **IsWideScalar**`<T>`
 *
 * Boolean operator which validates whether or not `T`
 * is considered a "wide type" _and_ extends `Scalar`.
 *
 * - by default `undefined` and `null` will always return `false`
 * as they are considered _literal_ types
 *     - however because they are non-variant literals there are times where
 *     it can be useful to group them together with wide strings, numbers, and
 *     boolean types.
 *     - set `U` to `allow-null` to match against _null_ types
 *     - set `U` to `allow-undefined` to match against _undefined_ types
 *     - set `U` to `["allow-null", "allow-undefined"]` to match on both
 *     _null_ and _undefined_
 */
export type IsWideScalar<
    T,
    U extends WideScalarModifiers = null
> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [T] extends [Scalar]
    ? [IsNull<T>] extends [true]
        ? [HasModifier<"allow-null", U, WideScalarModifiers>] extends [true]
            ? true
            : false
    : [IsUndefined<T>] extends [true]
        ? [HasModifier<"allow-undefined", U, WideScalarModifiers>] extends [true]
            ? true
            : false
    : [string] extends [T]
        ? true
    : [number] extends [T]
        ? true
    : [IsWideSymbol<T>] extends [true]
        ? true
    : [IsWideBoolean<T>] extends [true]
        ? true
    : false
: false;
