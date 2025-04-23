import type {
    Err,
    FromStringInputToken,
    Join,
    NestedSplit,
    RetainAfter,
    Trim,
    Unset,
    WhenErr
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type Isolate<T extends string> = NestedSplit<
    RetainAfter<T, "Set<">,
    ">",
    {
        "<": ">";
    }
>;

type Parse<T extends string> = Isolate<T> extends [infer Inner extends string, ...string[]]
    ? FromStringInputToken<Trim<Inner>>
    : never;

type Rest<T extends string> = Isolate<T> extends [string, ...infer R extends readonly string[]]
    ? Trim<Join<R, ">">>
    : never;

/**
 * Look for a `Set<...>` token at the start of a input token.
 *
 * - returns `Unset` if not found
 * - returns the Set's type -- with generics -- if there are no more tokens
 * after this token
 * - continues processing the rest of the string if there are more tokens
 * to be processed and adds an entry to the `TContainers` generic
 */
export type IT_TakeSet<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Set<${string}`
    ? Parse<T> extends Error
        ? WhenErr<Parse<T>, { in: Trim<T>; subType: "set" }>
        : Set<Parse<T>> extends Error
            ? Err<`invalid-token/set`, `Was able to convert type but unable to use it as the type for Set<T>`, { type: Parse<T>; token: T }>
            : FromStringInputToken<
                Rest<T>,
                [ ...TInner, Set<Parse<T>>],
                TContainers
            >
    : Unset;

// DEBUG SET
// type T = "Set<string | Number<4>> | string"
// type TIsolated = Isolate<T>;
// type TParse = Parse<T>;
// type TRest = Rest<T>;
