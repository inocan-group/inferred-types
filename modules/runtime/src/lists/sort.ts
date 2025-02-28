import type {
    FromDefn,
    Narrowable,
    SimpleToken,
} from "inferred-types/types";

export type RuntimeSort<
    F extends SimpleToken = SimpleToken,
    S extends SimpleToken = SimpleToken
> = {
    first?: readonly F[];
    last?: readonly S[];
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
    return (
        container
    ) as unknown as S;
}

// const a = sort([1, 2, "foo", 55, "bar"], { first: ["string(bar)", "number(55)"] });
