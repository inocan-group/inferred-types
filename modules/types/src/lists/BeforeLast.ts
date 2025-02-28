import type { Chars, Concat, Handle, IsEqual, Pop, Tuple } from "inferred-types/types";

/**
 * **BeforeLast**`<T>`
 *
 * Returns:
 *
 * - the _elements_ in an **array**; _excluding_ the last element
 * - the _characters_ in a **string** excluding the last character
 *
 * This behavior is _very_ much like `Pop<T>` but where `Pop<T>` will
 * return _never_ when an empty input is passed in, this utility returns
 * the "empty" state:
 *
 * - a _tuple_ will return `[]`
 * - a _string_ will return ""
 *
 * **Related:** `Pop`, `Last`, `AfterFirst`, `First`
 */
export type BeforeLast<
    T extends Tuple | string,
> = T extends string
    ? string extends T
        ? string
        : IsEqual<T, ""> extends true
            ? ""
            : Pop<Chars<T>> extends readonly string[]
                ? Concat<Pop<Chars<T>>>
                : never
    : T extends Tuple
        ? Handle<Pop<T>, never, []>
        : never;
