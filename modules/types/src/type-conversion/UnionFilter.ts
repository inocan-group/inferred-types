import type {
  AfterFirst,
  CamelCase,
  Dictionary,
  EmptyObject,
  Equals,
  First,
  IsUnion,
  KebabCase,
  Keys,
  PascalCase,
  RemoveNever,
  SnakeCase,
  Some,
  UnionToTuple,
} from "inferred-types/types";

type RemoveEmptyObject<
  T extends readonly unknown[],
  R extends readonly unknown[] = [],
> = [] extends T
  ? RemoveNever<R>[number]
  : RemoveEmptyObject<
    AfterFirst<T>,
    [
      ...R,
      First<T> extends Dictionary
        ? Equals<Keys<First<T>>["length"], number> extends true
          ? never
          : First<T>
        : First<T>,
    ]
  >;

/**
 * **UnionFilter**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _extend_ `E`.
 *
 * **Note:** _this is very much like `Exclude<U,E>` utility but can handle
 * unions of containers as well as just scalar values._
 *
 * **Related:** `UnionRetain`
 */
export type UnionFilter<
  U,
  E,
> = [U] extends [never]
  ? never
  : IsUnion<U> extends true
    ? Some<UnionToTuple<E>, "extends", EmptyObject> extends true
      ? Exclude<
        RemoveEmptyObject<UnionToTuple<U>>,
        RemoveEmptyObject<UnionToTuple<E>>
      >
      : Exclude<U, E>
    : U; // not union

export type UnionMutationOp =
  | "Capitalize"
  | "Lowercase"
  | "CamelCase"
  | "PascalCase"
  | "SnakeCase"
  | "KebabCase";

type Mutate<
  TElements extends readonly unknown[],
  TOp extends UnionMutationOp,
> = TOp extends "Capitalize"
  ? {
      [K in keyof TElements]: TElements[K] extends string
        ? Capitalize<TElements[K]>
        : TElements[K]
    }
  : TOp extends "Lowercase"
    ? {
        [K in keyof TElements]: TElements[K] extends string
          ? Lowercase<TElements[K]>
          : TElements[K]
      }
    : TOp extends "CamelCase"
      ? {
          [K in keyof TElements]: TElements[K] extends string
            ? CamelCase<TElements[K]>
            : TElements[K]
        }
      : TOp extends "PascalCase"
        ? {
            [K in keyof TElements]: TElements[K] extends string
              ? PascalCase<TElements[K]>
              : TElements[K]
          }
        : TOp extends "KebabCase"
          ? {
              [K in keyof TElements]: TElements[K] extends string
                ? KebabCase<TElements[K]>
                : TElements[K]
            }
          : TOp extends "SnakeCase"
            ? {
                [K in keyof TElements]: TElements[K] extends string
                  ? SnakeCase<TElements[K]>
                  : TElements[K]
              }
            : never;

export type UnionMutate<
  U,
  Op extends UnionMutationOp,
> = [U] extends [never]
  ? never
  : IsUnion<U> extends true
    ? Mutate<UnionToTuple<U>, Op>[number]
    : U;
