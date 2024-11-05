import { UnionToTuple, TupleToUnion, Filter, IsUnion, Tuple, CamelCase, PascalCase, KebabCase, SnakeCase } from "inferred-types/dist/types/index";


type Reduce<
    T extends Tuple,
    E
> = TupleToUnion<
    Filter<{
        [K in keyof T]: T[K] extends E
            ? never
            : T[K]
    }, never>
>;

type Isolate<
    T extends Tuple,
    E
> = TupleToUnion<
    Filter<{
        [K in keyof T]: T[K] extends E
            ? T[K]
            : never
    }, never>
>;

/**
 * **UnionFilter**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _extend_ `E`.
 *
 * **Related:** `UnionRetain`
 */
export type UnionFilter<U, E> = [U] extends [never]
? never
: [IsUnion<U>] extends [true]
    ? Reduce<UnionToTuple<U>,E>
    : [U] extends [E]
        ? never
        : U;

/**
 * **UnionRetain**`<U, E>`
 *
 * A type utility which receives a union type `U` and then eliminates
 * all elements of the union which _do not extend_ `E`.
 *
 * **Related:** `UnionFilter`
 */
export type UnionRetain<U, E> = [U] extends [never]
? never
: IsUnion<U> extends true
    ? Isolate<UnionToTuple<U>,E>
    : U extends E
        ? U
        : never;


export type UnionMutationOp =
| "Capitalize"
| "Lowercase"
| "CamelCase"
| "PascalCase"
| "SnakeCase"
| "KebabCase";

type Mutate<
  TElements extends readonly unknown[],
  TOp extends UnionMutationOp
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
  Op extends UnionMutationOp
> = [U] extends [never]
? never
: IsUnion<U> extends true
    ? Mutate<UnionToTuple<U>,Op>[number]
    : U;
