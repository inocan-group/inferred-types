import { IsAny, IsNever, IsTuple } from "inferred-types/types";

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

type AllValuesAreLiteral<T> = T extends Record<PropertyKey, infer V>
    ? IsLiteralValue<V>
    : false;

/**
 * **IsLiteralObject**`<T>`
 *
 * Boolean operator which tests whether `T` is a literal object.
 */
export type IsLiteralObject<T> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
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
        ? [T] extends [{}]
            ? true  // empty object {} is literal
            : false // wide object type
        : AllValuesAreLiteral<T>
: false;


type X = keyof object;
