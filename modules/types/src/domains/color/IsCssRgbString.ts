import type {
    Every,
    IsRgbTuple,
    Length,
    Split,
    ToNumericArray,
    TrimEach
} from "inferred-types/types";

/**
 * **IsCssRgbString**`<T>`
 *
 * Boolean operator which tests whether `T` is a string literal which
 * accurately represents a RGB string in CSS syntax (e.g., `rgb(1,1,1)`)
 */
export type IsCssRgbString<T> = T extends string
    ? string extends T
        ? boolean
        : T extends `rgb(${infer Inner})`
            ? Split<Inner, ","> extends infer S extends readonly string[]
                ? Length<S> extends 3
                    ? Every<TrimEach<S>, "extends", `${number}`> extends true
                        ? IsRgbTuple<
                            ToNumericArray<TrimEach<S>>
                        >
                        : false
                    : false
                : false
            : false
    : false;
