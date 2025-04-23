import { ComparatorOperation, DateLike, Defined, Dictionary, InputToken__SimpleTokens, Narrowable, StringKeys } from "inferred-types/types";

type Op = { params: readonly Narrowable[]; accept?: Narrowable };

type Lookup = {
    extends: { params: [type: InputToken__SimpleTokens] };
    startsWith: { params: [unionOf: string, ...readonly string[]]   };
    endsWith: { params: [end: string] };
    endsWithNumber: { params: []; accept: string };
    contains: { params: [substring: string]; accept: string };
    greaterThan: { params: [value: number] };
    lessThan: { params: [value: number] };
    between: { params: [greaterThan: number, lessThan: number] };
    equalTo: { params: [value: Narrowable] };
    errors: { params: [] };
    errorsOfType: { params: [type: string]; accept: Narrowable };
    before: { params: [date: DateLike]; accept: DateLike };
    after: { params: [date: DateLike]; accept: DateLike };
    truthy: { params: [] };
    falsy: { params: []; accept: Narrowable };
    keyEquals: { params: [ key: string, value: Narrowable ]; accept: Dictionary };
    keyIsOfType: { params: [key: string, type: InputToken__SimpleTokens]; accept: Dictionary };
    keyStartsWith: { params: [start: string]; accept: Dictionary };
    keyEndsWith: { params: [start: string]; accept: Dictionary };
} & Record<string, Op>;

type BaseType<
    T extends keyof Lookup
> = Lookup[T]["accept"] extends Defined
    ? Lookup[T]["accept"]
    : Lookup[T]["params"]["length"] extends 0
        ? Narrowable
        : Lookup[T]["params"][number];

type Accept<
    T extends keyof Lookup
> = BaseType<T> | readonly BaseType<T>[];




export type FilterFn<
    TOp extends ComparatorOperation,
    TParams extends readonly unknown[]
> = <T extends Accept<TOp>>(val: T) => {

};

export function filter<
    TOp extends ComparatorOperation,
    TParams extends readonly unknown[]
>(
    op: TOp,
    ...params: TParams
): FilterFn<TOp, TParams> {
    return (val) => {

    }
}


const a = filter("contains", "foo");
const b = a("foobar");

