import {
    Container,
    Dictionary,
    EmptyObject,
    GetOptionalElementCount,
    HasOptionalElements,
    HasVariadicTail,
    IsWideContainer,
    Negative,
    OptionalKeys,
    SliceArray,
    WithKeys
} from "inferred-types/types";

/**
 * **OnlyOptional**`<T>`
 *
 * Takes a container as `T` and returns only those elements in the
 * container which are marked as "optional".
 *
 * ```ts
 * // { bar?: 2; baz? number }
 * type Obj = OnlyOptional<{foo: 1; bar?:2; baz?: number }>;
 * // [3?]
 * type Arr = OnlyOptional<[1,2,3?]>
 * ```
 *
 * **Related:** `OnlyRequired`
 */
export type OnlyOptional<T extends Container> = [IsWideContainer<T>] extends [true]
? T
: [T] extends [readonly unknown[]]
    ? [HasOptionalElements<T>] extends [false]
        ? []
        : HasVariadicTail<T> extends false
            ? GetOptionalElementCount<T> extends number
                ? SliceArray<T, Negative<GetOptionalElementCount<T>>>
                : never
            : GetOptionalElementCount<T> extends infer Count extends number
                ? SliceArray<T, Negative<Count>>
                : never
: T extends Dictionary
    ? HasOptionalElements<T> extends false
        ? EmptyObject
    : WithKeys<T, OptionalKeys<T>>
: never;


