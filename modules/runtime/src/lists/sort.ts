import type {
    FromDefn,
    IsEqual,
    Narrowable,
    SimpleToken,
} from "inferred-types/types";

export type RuntimeSort<
    F extends SimpleToken = SimpleToken,
    S extends SimpleToken = SimpleToken
> = {
    first?: readonly F[];
    last?: readonly S[];
    offset?: string
};

type ToConfig<
    T extends RuntimeSort
> = {
    first: FromDefn<T["first"]>;
    last: FromDefn<T["last"]>;
};

export function sort<
    T extends readonly N[],
    N extends Narrowable,
    S extends RuntimeSort
>(
    container: T,
    sort: S,
) {
    let first: unknown[] = [];
    let rest: unknown[] = [];
    let last: unknown[] = [];

    first = sort?.offset
        ? []
        :

    return (
        container
    ) as unknown as S;
}

// const a = sort([1, 2, "foo", 55, "bar"], { first: ["string(bar)", "number(55)"] });

type ArrayToken = `Array<${string}>` & {
    kind: "ArrayToken"
};

type WideToken = "string" | "number" | "boolean" | "undefined" | "unknown" | "any";

type ConvertWide<T extends WideToken> = T extends "string"
? string
: T extends "number"
? number
: T extends "boolean"
? boolean
: T extends "null"
? null
: T extends "undefined"
? undefined
: T extends "unknown"
? unknown
: T extends "any"
? any
: never;

;


type A<T extends `Array<${string}>` = `Array<${string}>`> =
? T extends `Array<string>`
    ? string[]
    : T extends `Array<${infer W}>`
        ? W extends WideToken
            ? Array<ConvertWide<W>>
            : "not wide"
    : never;

const fn = <T extends `Array<${string}>`>(arr: T) => arr as unknown as A<T>;

const a = fn("Array<string>")
