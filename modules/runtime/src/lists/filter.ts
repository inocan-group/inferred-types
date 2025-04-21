import { err } from "inferred-types/runtime";
import {
    DateLike,
    IsDefined,
    Narrowable,
    StringKeys,
    InputToken__SimpleTokens,
    Defined,
    Dictionary
} from "inferred-types/types";
import { isDateLike } from "inferred-types/runtime";

type Op = {params: readonly Narrowable[], accept?: Narrowable}

type Lookup = {
    extends: {params: [type: InputToken__SimpleTokens]};
    startsWith: {params: [start: string | readonly [string, ...string[]]]};
    endsWith: {params: [end: string]};
    endsWithNumber: {params: [], accept: string};
    contains: {params: [substring: string], accept: string};
    greaterThan: {params: [value: number]};
    lessThan: {params: [value: number]};
    between: {params: [greaterThan: number, lessThan: number]};
    equalTo: {params: [value: Narrowable]};
    errors: {params: []};
    errorsOfType: {params: [type: string], accept: Narrowable};
    before: {params: [date: DateLike], accept: DateLike};
    after: {params: [date: DateLike], accept: DateLike};
    truthy: {params: []};
    falsy: {params: [], accept: Narrowable};
    keyEquals: {params: [ key: string, value: Narrowable ], accept: Dictionary};
    keyIsOfType: {params: [key: string, type: InputToken__SimpleTokens], accept: Dictionary};
    keyStartsWith: { params: [start: string], accept: Dictionary };
    keyEndsWith: { params: [start: string], accept: Dictionary };
} & Record<string, Op>;

type BaseType<
    T extends keyof Lookup
> = Lookup[T]["accept"] extends Defined
    ? Lookup[T]["accept"]
    : Narrowable;

type Accept<
    T extends keyof Lookup
> = BaseType<T> | readonly BaseType<T>[];

export type FilterFn<
    TOp extends StringKeys<Lookup>[number],
    TParams extends readonly Narrowable[],
> = <T extends Accept<TOp>>(val: T) => T extends any[]
    ? readonly BaseType<TOp>[] | Error
    : boolean | Error;

type X = BaseType<"keyEndsWith">;

/**
 * **filter**`(op, [details])` => (val) => boolean
 *
 * A set of filter functions which provide strong (and narrow)
 * typing support.
 *
 * - The first call sets up the filter operation and returns a
 * function which can be used as a filter
 * - the second call (aka, the actual filter function) will accept
 * either a singular element or an array of elements.
 *
 * **Related:** `retain()`
 */
export function filter<
    TOp extends StringKeys<Lookup>[number],
    TParams extends Lookup[TOp]["params"]
>(
    op: TOp,
    ...params: TParams
): FilterFn<TOp, TParams> {

    return <T extends Accept<TOp>>(val: T) => {
        switch(op) {
            case "after":
            case "before":
                if(isDateLike(op)) {
                    // process
                } else {
                    return err(`invalid-param/${op}`, `The "${op}" parameter expects a Date or ISO8601 based date or datetime string`)
                }
        }
        return err(
                `unknown-op/filter`,
                `An unknown filter operation '${op}' was provided to the filter() function!`
        )
    }
}

const a = filter("startsWith", "foo");
const b = filter("startsWith", ["foo","bar","baz"]);
const d = filter("before", "2010-01-01");

const v = a(["foo","bar"]);

