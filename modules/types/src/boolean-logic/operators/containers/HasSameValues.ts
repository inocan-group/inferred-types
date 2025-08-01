import type {
    And,
    As,
    Container,
    Dictionary,
    IsAny,
    IsNever,
    IsObject,
    Or,
    Values
} from "inferred-types/types";

type Find<
    TList extends readonly unknown[],
    TComparator,
> = Or<{
    [K in keyof TList]: [TList[K]] extends [TComparator] ? true : false
}>;

type Compare<
    TList extends readonly unknown[],
    TComparator extends readonly unknown[],
> = And<{
    [K in keyof TList]: Find<TComparator, TList[K]> extends boolean
        ? Find<TComparator, TList[K]>
        : never
}, true>;

type Process<
    TList extends readonly unknown[],
    TComparator extends readonly unknown[],
> = TList["length"] extends TComparator["length"]
    ? Compare<
        TList,
        TComparator
    >
    : false;

type _HasSameValues<
    TContainer extends readonly unknown[],
    TComparator extends readonly unknown[],
> = TContainer extends readonly unknown[]
    ? Process<TContainer, TComparator>
    : TContainer extends Dictionary
        ? Process<Values<TContainer>, TComparator>
        : never;

/**
 * **HasSameValues**`<TContainer,TComparator>`
 *
 * Boolean type utility which determines if the values in
 * `TContainer` and `TComparator` are the same (even if the order
 * is different).
 *
 * - if _either_ `TContainer` or `TComparator` are wide types then
 * this utility will evaluate to `boolean` rather than the typical `true`
 * or `false` literals
 *
 * #### `any` and `never`
 *
 * - if _either_ `TContainer` or `TComparator` or _both_ are equal to
 * `never` or `any` then this utility will resolve in `TException` (which
 * defaults to being `false`)!
 */
export type HasSameValues<
    TContainer extends Container,
    TComparator extends Container,
    TException = false
> = [IsAny<TContainer>] extends [true]
    ? TException
: [IsNever<TContainer>] extends [true]
    ? TException
: [IsAny<TComparator>] extends [true]
    ? TException
: _HasSameValues<Values<TContainer>, Values<TComparator>>
