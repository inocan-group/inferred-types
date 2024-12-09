import type { Dictionary, IsObjectLiteral, IsTuple } from "inferred-types/types";

type MutableObject<T> = [T] extends [boolean]
  ? T
  : {
      -readonly [K in keyof T]: T[K] extends Dictionary
        ? MutableObject<T[K]>
        : IsTuple<T[K]> extends true
          ? T[K]
          : T[K] extends readonly (infer R)[]
            ? R[]
            : T[K];
    };

type MutableArray<T extends readonly unknown[]> = [...{

  [K in keyof T]: Mutable<T[K]>
}];

/**
 * **Mutable**`<T>`
 *
 * Makes a readonly value to a mutable value without
 * widening the type.
 */
export type Mutable<T> = [T] extends [readonly unknown[]]
  ? MutableArray<T>
  : [T] extends [boolean]
      ? T
      : [IsObjectLiteral<T>] extends [true] ? MutableObject<T> : T;

/**
 * **Immutable**`<T>`
 *
 * Makes a _mutable_ value _immutable_.
 */
export type Immutable<T extends { [propName: string]: unknown }> = {
  readonly [key in keyof T]: T[key] extends { [propName: string]: unknown }
    ? Immutable<T[key]>
    : T[key]
};
