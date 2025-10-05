import { Container, HasOptionalElements, HasVariadicTail, IsWideContainer, Min } from "inferred-types/types";


/**
 * **OnlyRequired**`<T>`
 *
 * Takes a container as `T` and returns only those elements in the
 * container which are marked as "optional".
 *
 * ```ts
 * // { foo: 1 }
 * type Obj = OnlyRequired<{foo: 1; bar?:2; baz?: number }>;
 * // [1,2]
 * type Arr = OnlyRequired<[1,2,3?]>
 * ```
 *
 * **Related:** `OnlyOptional`
 */
export type OnlyRequired<T extends Container> = [IsWideContainer<T>] extends [true]
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

