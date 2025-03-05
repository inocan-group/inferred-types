import type {
    Narrowable,
    SimpleToken,
} from "inferred-types/types";

export type RuntimeSort<
    F extends SimpleToken = SimpleToken,
    S extends SimpleToken = SimpleToken
> = {
    first?: readonly F[];
    last?: readonly S[];
    offset?: string;
};

export function sort<
    T extends readonly N[],
    N extends Narrowable,
    S extends RuntimeSort
>(
    container: T,
    sort: S,
) {
    let _first: unknown[] = [];
    const _rest: unknown[] = [];
    const _last: unknown[] = [];

    _first = sort?.offset
        ? []
        : [];

    return (
        container
    ) as unknown as S;
}
