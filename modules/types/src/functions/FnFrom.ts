import type { AsNarrowingFn, Dictionary, EmptyObject, ExpandRecursively } from "inferred-types/types";

/**
 * **FnFrom**`<TParams,[TReturn],[TProps]>`
 *
 * Type utility  to build a type from it's constituent parts.
 */
export type FnFrom<
    TParams extends readonly unknown[],
    TReturn = unknown,
    TProps extends Dictionary = EmptyObject,
> = EmptyObject extends TProps
    ? TParams["length"] extends 0
        ? () => TReturn
        : AsNarrowingFn<TParams, TReturn>
    : TParams["length"] extends 0
        ? (() => TReturn) & ExpandRecursively<TProps>
        : AsNarrowingFn<TParams, TReturn, TProps>;
