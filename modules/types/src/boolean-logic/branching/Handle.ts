import type {
    If,
    IsEqual,
    IsUnion,
    NotFilter,
    TupleToUnion,
    UnionToTuple,
} from "inferred-types/types";

type Narrow<
    TContent,
    THandle,
> = IsUnion<TContent> extends true
    ? UnionToTuple<TContent> extends readonly unknown[]
        ? UnionToTuple<TContent> extends readonly unknown[]
            ? NotFilter<UnionToTuple<TContent>, "extends", [THandle]> extends readonly unknown[]
            : never
        : TupleToUnion<NotFilter<UnionToTuple<TContent>, "extends", [THandle]>>
            : never
    : TContent;

/**
 * **Handle**`<TContent,THandle,TMapTo,[TSpecificity]>`
 *
 * Maps `TContent` when it _extends_ / _equals_ (based on `TSpecificity`) the type
 * of `THandle` to `TMapTo`, otherwise it just proxies the value through.
 *
 * - `TSpecificity` defaults to _extends_ but can be set to _equals_
 *
 * **Related:** `THandle`
 */
export type Handle<
    TContent,
    THandle,
    TMapTo,
    TSpecificity extends "extends" | "equals" = "extends",
> =
[THandle] extends [never[]]
    ? [TContent] extends never[]
        ? TMapTo
        : TContent
    : TSpecificity extends "extends"
        ? [TContent] extends [THandle]
            ? TMapTo
            : Narrow<TContent, THandle>
        : If<
            IsEqual<[TContent], [THandle]>,
            TMapTo,
            TContent
        >;
