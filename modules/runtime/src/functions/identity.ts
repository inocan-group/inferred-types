import type { Narrowable } from "inferred-types/types";

/**
 * An identity function for any type, with the goal of preserving literal type information
 * where ever possible.
 */
export function identity(): undefined;
export function identity(value: undefined): undefined;
export function identity<const T extends Narrowable>(value: T): T;
export function identity<const T extends readonly Narrowable[]>(...values: T): [...T];
export function identity<T extends Narrowable>(...values: T[]): T[] | T | undefined {
    return values.length === 1 ? values[0] : values.length === 0 ? undefined : values;
}
