import { CamelCase, Contains, Filter, HasUnionType, IsUnion, KebabCase, NarrowlyContains, NotFilter, PascalCase, SnakeCase, UnionToTuple } from "inferred-types/types";

export type UnionMutationOp =
    | "Capitalize"
    | "Lowercase"
    | "Uppercase"
    | "CamelCase"
    | "PascalCase"
    | "SnakeCase"
    | "KebabCase"
    | "Required";



type Mutate<
    TElements extends readonly unknown[],
    TOp extends UnionMutationOp,
> = TOp extends "Capitalize"
    ? {
        [K in keyof TElements]: TElements[K] extends string
            ? Capitalize<TElements[K]>
            : TElements[K]
    }
    : TOp extends "Uppercase"
        ? {
            [K in keyof TElements]: TElements[K] extends string
                ? Uppercase<TElements[K]>
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
    : TOp extends "Required"
        ? NotFilter<TElements, "equals", [undefined]> extends readonly unknown[]
            ? NotFilter<TElements, "equals", [undefined]>
            : never
    : never;


/**
 * **UnionMutate**`<T, Op>`
 *
 * Mutates `T` if it is a union, if it is not a union it passed through as is.
 *
 * Mutation operations include:
 *
 * - Capitalize, Lowercase
 * - CamelCase, PascalCase, KebabCase, SnakeCase
 * - Required (removed `undefined` in a union)
 */
export type UnionMutate<
    T,
    Op extends UnionMutationOp,
> = [T] extends [never]
    ? never
    : IsUnion<T> extends true
        ? Mutate<UnionToTuple<T>, Op>[number]
        : T;


